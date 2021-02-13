/// <reference types="cypress" />
// whenever the app is about to load any window
// let's prevent "window.onbeforeunload =" assignment
Cypress.on('window:before:load', (win) => {
  Object.defineProperty(win, 'onbeforeunload', {
    value: undefined,
    writable: false,
  })
})

describe('App with window.onbeforeunload', () => {
  it('should reload', () => {
    cy.visit('/').pause()
    cy.reload()
  })
})
