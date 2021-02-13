/// <reference types="cypress" />
Cypress.on('window:before:load', (win) => {
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
          set(x) {
            // do nothing
          },
        })

        const result = userCallback(e)
        return result
      }

      // https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
      win.addEventListener('beforeunload', ourCallback)
    },
  })
})

describe('App with window.onbeforeunload', () => {
  it('asks to confirm before reload', () => {
    cy.visit('/').pause()
    cy.reload()
  })
})
