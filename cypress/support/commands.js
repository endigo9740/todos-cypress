Cypress.Commands.add('seedAndVisit', () => {
    // Stub HTTP -- https://docs.cypress.io/guides/guides/network-requests#Stubbing
    cy.intercept(
        'GET', 'https://jsonplaceholder.typicode.com/posts',
        { fixture: 'posts.json' }
    ).as('getInitPosts')
    cy.visit('/')
})
