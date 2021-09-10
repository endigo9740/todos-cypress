const elemPostArticles = '#posts #content article';

describe('Posts list', () => {

    beforeEach(() => {
        cy.seedAndVisit()
    })

    it('should have seeded posts when loaded', () => {
        cy.get(elemPostArticles)
            .should('have.length', 4)
    })

    it('should have a post with .highlight class', () => {
        cy.get(elemPostArticles)
            .filter('.highlight')
            .should('have.length', 1)
            .and('contain', 'qui est esse')
            .find('.id')
            .should('contain', 2)
    })

})
