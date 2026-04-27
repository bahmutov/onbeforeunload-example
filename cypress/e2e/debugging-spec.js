/// <reference types="cypress" />
// only showing the test in the debugging section
// https://glebbahmutov.com/blog/onbeforeunload/#debugging
describe.skip('App with window.onbeforeunload', () => {
  it('debugs event listeners', () => {
    cy.visit('/')
    cy.pause() // add to pause the test
    cy.reload()
    cy.get('@returnValue')
      .should('have.been.calledOnce')
      .and('be.calledWithExactly', 'ask user')
  })
})
