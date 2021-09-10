const elemError = '#error';
const elemNewTodoInput = '#newTodo';
const elemListItems = '#list li';
const elemCount = '#count';
const elemBtnClear = '#btnClear';
const typedText = 'Walk the dog';

describe('Todos list', () => {

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
            cy.inputTodoAndSubmit('');
            cy.get(elemListItems)
                .should('not.exist')
            cy.get(elemError)
                .should('be.visible')
        })

        it('adds a new todo when submitted', () => {
            cy.inputTodoAndSubmit(typedText);
            cy.get(elemListItems)
                .should('have.length', 1)
                .and('contain', typedText)
        })

        it('todo list item is unchecked by default', () => {
            cy.inputTodoAndSubmit(typedText);
            cy.get(`${elemListItems} input`)
                .should('not.be.checked')
        })

        it('todo list item is marked complete when clicked', () => {
            cy.inputTodoAndSubmit(typedText);
            cy.get(`${elemListItems}`)
                .first()
                .click()
            cy.get(`${elemListItems} h3`)
                .should('have.class', 'complete')
            cy.get(`${elemListItems} input`)
                .should('be.checked')
        })

    })

    context('clear todos', () => {

        it('has zero todos when cleared', () => {
            cy.get(elemListItems).should('have.length', 0)
            cy.get(elemBtnClear).click()
            cy.get(elemListItems).should('not.exist')
        })

    })
})
