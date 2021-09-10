const elemPostArticles = '#posts #content article';

describe('App initilization', () => {

    it('loads http posts when page is loaded', () => {
        cy.seedAndVisit()
        cy.get(elemPostArticles)
            .should('have.length', 4)
    })

})
