describe('Cypress Testset 1 - Startseite laden und einloggen', function(){
    it('FDB Startseite laden', function(){

        // Arrange - setup initial app state
        //              - visit a web page
        //              - query for an element  
        cy.visit("http://t7.fuegedatenbank.han.vw.vwg/Software/Navigation.php");
        cy.get("input[name=benutzername]").type('dsi0gbl');
        cy.get("input[name=password]").type('yourpassword',  { log: false });


        // Act - take an action
        //              - interact with that element
        
                 
        // Assert - make an assertion
        //              - make an assertion about page

    }) // end of 'FDB Startseite laden'

    it('gets the post', () => {
        
        cy.visit("http://t7.fuegedatenbank.han.vw.vwg/Software/Navigation.php");
        var iframeHaupt = 'iframe[name="Haupt"]';
        getIframeBody('iframe[name="Haupt"]').find("input[name=benutzername]").type('dsi0gbl'); // .should('have.text', 'Try it').click()
        getIframeBody('iframe[name="Haupt"]').find("input[name=password]").type('yoursecretpassword',  { log: false }); // .find('#result').should('include.text', '"delectus aut autem"')
      })
}) // end of Testset 1 
