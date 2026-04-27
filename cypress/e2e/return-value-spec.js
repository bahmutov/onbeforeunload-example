/// <reference types="cypress" />
beforeEach(() => {
  // before we are inside a hook executing as part of the test
  // we can use cy.on methods and create stubs, something
  // we could not do from Cypress.on callbacks
  const returnValueStub = cy.stub().as('returnValue')

  cy.on('window:before:load', (win) => {
    let userCallback, ourCallback
    Object.defineProperty(win, 'onbeforeunload', {
      get() {
        return ourCallback
      },
      set(cb) {
        userCallback = cb
        console.log('user callback', cb)

        ourCallback = (e) => {
          console.log('proxy beforeunload event', e)

          // prevent the application code from assigning value
          Object.defineProperty(e, 'returnValue', {
            get() {
              return ''
            },
            set: returnValueStub,
          })

          const result = userCallback(e)
          return result
        }

        // https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
        win.addEventListener('beforeunload', ourCallback)
      },
    })
  })
})

describe('App with window.onbeforeunload', () => {
  it('sets returnValue', () => {
    cy.visit('/')
    // reload twice just for fun
    cy.reload().reload()
    cy.get('@returnValue')
      .should('have.been.calledTwice')
      .and('be.calledWithExactly', 'ask user')
  })
})
