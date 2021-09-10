const elemListItems = '#list li';
const elemCount = '#count';
const elemBtnClear = '#btnClear';

const typedText = 'Walk the dog';
const tasksArr = [1,2,3];
const filters = [
    {elem: '#filterAll', expects: tasksArr.length},
    {elem: '#filterActive', expects: tasksArr.length - 1},
    {elem: '#filterComplete', expects: 1},
];

describe('Todos footer', () => {

    beforeEach(() => {
        cy.seedAndVisit()
    })

    context('count', () => {

        context('with zero todos', () => {

            it('count has a value of 0 for a zero todos', () => {
                cy.get(elemCount).should('contain', 0)
            })

            it('count shows plural text for a zero todos', () => {
                cy.get(elemCount).should('contain', '0 todos')
            })

        })

        context('with a single todo', () => {

            it('count has a value of 1 for a single todo', () => {
                cy.inputTodoAndSubmit(typedText);
                cy.get(elemCount).should('contain', 1)
            })

            it('count shows singular text for a single todo', () => {
                cy.inputTodoAndSubmit(typedText);
                cy.get(elemCount).should('contain', '1 todo')
            })

        })

        context('with multiple todos', () => {

            beforeEach(() => {
                tasksArr.forEach(t => { cy.inputTodoAndSubmit(`task ${t}`) });
            })

            it('count has a value of 3 for three todo', () => {
                cy.get(elemCount).should('contain', 3)
            })

            it('count shows plural text for three todo', () => {
                cy.get(elemCount).should('contain', '3 todos')
            })

        })

        it('todo count should go up when todo added', () => {
            cy.inputTodoAndSubmit(typedText);
            cy.get(elemCount).should('contain', 1)
            cy.inputTodoAndSubmit(typedText);
            cy.get(elemCount).should('contain', 2)
            cy.inputTodoAndSubmit(typedText);
            cy.get(elemCount).should('contain', 3)
        })

    })

    context('filters', () => {

        beforeEach(() => {
            tasksArr.forEach(t => { cy.inputTodoAndSubmit(`task ${t}`) });
            cy.get(`${elemListItems}`).first().click()
        })

        it('handle filter links', () => {
            cy.wrap(filters).each(filter => {
                cy.get(filter.elem).click();
                cy.get(elemListItems).should('have.length', filter.expects)
            })
        })

    })

})
