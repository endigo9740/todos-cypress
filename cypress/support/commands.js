Cypress.Commands.add('seedAndVisit', () => {

    // Intercept HTTP + stub response -- https://docs.cypress.io/guides/guides/network-requests#Stubbing
    cy.intercept(
        'GET', 'https://jsonplaceholder.typicode.com/posts',
        { fixture: 'posts.json' }
    ).as('getPosts')

    // Visit base url
    cy.visit('/')
})

Cypress.Commands.add('inputTodoAndSubmit', (t) => {
    cy.get('#newTodo')
        .type(`${t}{enter}`)
        .should('have.value', '')
})
