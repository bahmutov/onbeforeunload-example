/// <reference types="cypress" />
describe('App with window.onbeforeunload', () => {
  it('should reload', () => {
    // ignore user app's trying to set
    // window.onbeforeunload = ...
    // cy.on('window:before:load', (win) => {
    //   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
    //   Object.defineProperty(win, 'onbeforeunload', {
    //     value: undefined,
    //     writable: false
    //   })
    // })

    cy.visit('/')
    cy.reload()
  });
});
