# Random pieces that i stumbled upon



## Some do not want to think about our society - snarky comment was removed from Godot 

By chance i [read this old issue](https://github.com/xueyuanl/daily-hackernews/issues/183) an the line 
 _Godot maintainer removes controversial satirical piece from documentation_ is about deleted lines in [encrypting_save_games.rst](https://github.com/godotengine/godot-docs/commit/b872229427dddb9b749f46af597e85e25cf2955a#diff-841feeb473d47d77a70c7b467cb086d5f819c63a75da3cb689560d3268cd2a68)

 ```rst
.. _doc_encrypting_save_games:
Encrypting save games
=====================
Why?
----
.. This introduction is an Easter egg and is not intended to be taken seriously.
.. Please don't remove it :)
Because the world today is not the world of yesterday. A capitalist
oligarchy runs the world and forces us to consume in order to keep the
gears of this rotten society on track. As such, the biggest market for
video game consumption today is the mobile one. It is a market of poor
souls forced to compulsively consume digital content in order to forget
the misery of their everyday life, commute, or just any other brief
free moment they have that they are not using to produce goods or
services for the ruling class. These individuals need to keep focusing
on their video games (because not doing so will fill them with
tremendous existential angst), so they go as far as spending money on
them to extend their experience, and their preferred way of doing so is
through in-app purchases and virtual currency.
But what if someone were to find a way to edit the saved games and
assign the items and currency without effort? That would be terrible,
because it would help players consume the content much faster, and therefore
run out of it sooner than expected. If that happens, they will have
nothing that prevents them from thinking, and the tremendous agony of realizing
their own irrelevance would again take over their life.
No, we definitely do not want that to happen, so let's see how to
encrypt savegames and protect the world order.
... 
Note that ``OS.get_unique_id()`` does not work on UWP or HTML5.
That is all! Thank you for your cooperation, citizen.
.. note:: This method cannot really prevent players from editing their savegames
          locally because, since the encryption key is stored inside the game, the player
          can still decrypt and edit the file themselves. The only way to prevent this
          from being possible is to store the save data on a remote server, where players
          can only make authorized changes to their save data. If your game deals with
          real money, you need to be doing this anyway.

```
