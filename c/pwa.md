# Vibe Code for a possible pwa
Vibe coded alpha not even running 
## db

```javascript
import Dexie from 'dexie';

export const db = new Dexie('AnkiWebDB');

// Schema-Definition
// ++id ist ein Auto-Increment Primärschlüssel
// Indizierte Felder erlauben schnelle Suche/Filterung
db.version(1).stores({
  decks: '++id, title, createdAt',
  cards: '++id, deckId, front, back, nextReview, interval' 
});
```

## app

```javascript
import { db } from './db.js';

export const AppLogic = {
  // --- DECK MANAGEMENT ---
  async addDeck(title) {
    return await db.decks.add({
      title: title,
      createdAt: Date.now()
    });
  },

  async getAllDecks() {
    return await db.decks.toArray();
  },

  // --- CARD MANAGEMENT ---
  async addCard(deckId, front, back) {
    return await db.cards.add({
      deckId: parseInt(deckId),
      front: front,
      back: back,
      nextReview: Date.now(), // Sofort fällig
      interval: 0             // Start-Intervall für Spaced Repetition
    });
  },

  async getCardsToLearn(deckId) {
    const now = Date.now();
    return await db.cards
      .where('deckId').equals(parseInt(deckId))
      .filter(card => card.nextReview <= now)
      .toArray();
  },

  // --- LEERN-LOGIK (Spaced Repetition Light) ---
  async answerCard(cardId, isCorrect) {
    const card = await db.cards.get(cardId);
    
    // Einfache Logik: Wenn richtig, Intervall verdoppeln, sonst zurücksetzen
    const newInterval = isCorrect ? (card.interval || 1) * 2 : 1;
    const nextReview = Date.now() + (newInterval * 24 * 60 * 60 * 1000);

    await db.cards.update(cardId, {
      interval: newInterval,
      nextReview: nextReview
    });
  }
};
```

## HTM

```hml
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Offline Anki Web</title>
    <!-- Dexie.js Bibliothek laden -->
    <script src="https://unpkg.com"></script>
    <style>
        body { font-family: sans-serif; max-width: 500px; margin: 20px auto; padding: 10px; background: #f4f4f9; }
        section { background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); margin-bottom: 20px; }
        .hidden { display: none; }
        button { cursor: pointer; padding: 8px 12px; margin: 5px 0; }
        .card-box { border: 2px solid #ddd; padding: 20px; text-align: center; min-height: 100px; }
    </style>
</head>
<body>

    <h1>Anki Offline App</h1>

    <!-- 1. Deck Übersicht -->
    <section id="deck-list-section">
        <h2>Meine Decks</h2>
        <ul id="deck-list"></ul>
        <hr>
        <input type="text" id="new-deck-title" placeholder="Neues Deck Name...">
        <button onclick="uiAddDeck()">Deck erstellen</button>
    </section>

    <!-- 2. Karten hinzufügen -->
    <section id="add-card-section" class="hidden">
        <h2 id="current-deck-title-add"></h2>
        <input type="text" id="card-front" placeholder="Vorderseite">
        <input type="text" id="card-back" placeholder="Rückseite">
        <button onclick="uiSaveCard()">Karte speichern</button>
        <button onclick="showSection('deck-list-section')">Zurück</button>
    </section>

    <!-- 3. Lernen -->
    <section id="study-section" class="hidden">
        <h2 id="current-deck-title-study"></h2>
        <div class="card-box">
            <h3 id="display-front"></h3>
            <p id="display-back" class="hidden" style="color: blue; border-top: 1px solid #ccc; padding-top: 10px;"></p>
        </div>
        <div id="study-controls">
            <button id="btn-show-answer" onclick="document.getElementById('display-back').classList.remove('hidden')">Antwort zeigen</button>
            <div id="answer-buttons" class="hidden">
                <button onclick="uiRate(false)" style="background:#ffcccc">Falsch</button>
                <button onclick="uiRate(true)" style="background:#ccffcc">Richtig</button>
            </div>
        </div>
        <br>
        <button onclick="showSection('deck-list-section')">Lernen beenden</button>
    </section>

    <script>
        // --- DATENBANK SETUP ---
        const db = new Dexie('AnkiWebDB');
        db.version(1).stores({
            decks: '++id, title',
            cards: '++id, deckId, front, back, nextReview'
        });

        let currentDeckId = null;
        let cardsToLearn = [];
        let currentCardIndex = 0;

        // --- LOGIK ---
        async function uiAddDeck() {
            const input = document.getElementById('new-deck-title');
            if (input.value) {
                await db.decks.add({ title: input.value });
                input.value = '';
                renderDecks();
            }
        }

        async function renderDecks() {
            const decks = await db.decks.toArray();
            const list = document.getElementById('deck-list');
            list.innerHTML = decks.map(d => `
                <li>
                    <strong>${d.title}</strong><br>
                    <button onclick="prepareAddCard(${d.id}, '${d.title}')">+ Karte</button>
                    <button onclick="startLearning(${d.id}, '${d.title}')">Lernen</button>
                </li>
            `).join('');
        }

        // --- KARTEN HINZUFÜGEN ---
        function prepareAddCard(id, title) {
            currentDeckId = id;
            document.getElementById('current-deck-title-add').innerText = "Karte zu " + title + " hinzufügen";
            showSection('add-card-section');
        }

        async function uiSaveCard() {
            const front = document.getElementById('card-front');
            const back = document.getElementById('card-back');
            if (front.value && back.value) {
                await db.cards.add({
                    deckId: currentDeckId,
                    front: front.value,
                    back: back.value,
                    nextReview: Date.now()
                });
                front.value = ''; back.value = '';
                alert("Karte gespeichert!");
            }
        }

        // --- LERN MODUS ---
        async function startLearning(id, title) {
            currentDeckId = id;
            cardsToLearn = await db.cards
                .where('deckId').equals(id)
                .filter(c => c.nextReview <= Date.now())
                .toArray();

            if (cardsToLearn.length === 0) {
                alert("Keine Karten fällig!");
                return;
            }

            currentCardIndex = 0;
            document.getElementById('current-deck-title-study').innerText = "Lerne: " + title;
            showSection('study-section');
            showNextCard();
        }

        function showNextCard() {
            if (currentCardIndex >= cardsToLearn.length) {
                alert("Deck für heute fertig!");
                showSection('deck-list-section');
                return;
            }
            const card = cardsToLearn[currentCardIndex];
            document.getElementById('display-front').innerText = card.front;
            document.getElementById('display-back').innerText = card.back;
            document.getElementById('display-back').classList.add('hidden');
            document.getElementById('answer-buttons').classList.add('hidden');
            document.getElementById('btn-show-answer').classList.remove('hidden');
        }

        // Antwort zeigen Logic
        document.getElementById('btn-show-answer').addEventListener('click', () => {
            document.getElementById('btn-show-answer').classList.add('hidden');
            document.getElementById('answer-buttons').classList.remove('hidden');
        });

        async function uiRate(isCorrect) {
            const card = cardsToLearn[currentCardIndex];
            // Einfache Spaced Repetition: Wenn richtig, 1 Tag warten, sonst sofort wieder
            const waitTime = isCorrect ? (24 * 60 * 60 * 1000) : 0; 
            
            await db.cards.update(card.id, {
                nextReview: Date.now() + waitTime
            });

            currentCardIndex++;
            showNextCard();
        }

        // --- HELPER ---
        function showSection(id) {
            document.getElementById('deck-list-section').classList.add('hidden');
            document.getElementById('add-card-section').classList.add('hidden');
            document.getElementById('study-section').classList.add('hidden');
            document.getElementById(id).classList.remove('hidden');
        }

        // Start
        renderDecks();
    </script>
</body>
</html>
```
