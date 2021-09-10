const elemError = '#error';
const elemNewTodoInput = '#newTodo';
const elemListItems = '#list li';
const typedText = 'Walk the dog';

describe('Input form', () => {

    beforeEach(() => {
        cy.seedAndVisit()
    })

    it('focuses input on load', () => {
        cy.get(elemNewTodoInput).click()
        cy.focused().should('have.id', 'newTodo')
    })

    it('accepts input', () => {
        cy.get(elemNewTodoInput)
            .type(typedText)
            .should('have.value', typedText)
    })

    context('Form submission', () => {

        it('shows an error on empty input', () => {
            cy.get(elemNewTodoInput)
                .type(`{enter}`)
                .should('have.value', '')
            cy.get(elemListItems)
                .should('not.exist')
            cy.get(elemError)
                .should('be.visible')
        })

        it('adds a new todo when submitted', () => {
            cy.get(elemNewTodoInput)
                .type(`${typedText}{enter}`)
                .should('have.value', '')
            cy.get(elemListItems)
                .should('have.length', 1)
                .and('contain', typedText)
        })

    })
})
