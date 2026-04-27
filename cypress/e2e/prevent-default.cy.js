import 'cypress-real-events'

describe('Stub preventDefault', () => {
  beforeEach(() => {
    // create single functions that will be shared across all browser windows
    const beforeLoad = cy.stub().as('beforeLoad')
    const unloadPreventDefault = cy.stub().as('unloadPreventDefault')

    cy.on('window:before:load', (win) => {
      // calling this stub lets us confirm the window load event has fired
      beforeLoad()
      cy.stub(win.BeforeUnloadEvent.prototype, 'preventDefault')
        // calling the same stub function on each unload
        .callsFake(unloadPreventDefault)
    })
  })

  it('asks the user before navigating away', () => {
    cy.visit('/index2')
    cy.get('@beforeLoad').should('have.been.calledOnce')
    cy.contains('button', 'Click').realClick()
    cy.contains('hello world 2')
    // confirm the "unload" stub was not called yet
    cy.get('@unloadPreventDefault').should('not.have.been.called')

    cy.reload()
    // the new window instance has registered the unload stub
    cy.get('@beforeLoad').should('have.been.calledTwice')
    // and the application code has called preventDefault on the unload event
    cy.get('@unloadPreventDefault').should('have.been.calledOnce')
    // confirm the page has reloaded
    cy.contains('hello world 2')
  })

  it('reloads the page on click', () => {
    cy.visit('/index2')
    cy.contains('button', 'Reload').realClick()
    // and the application code has called preventDefault on the unload event
    cy.get('@unloadPreventDefault').should('have.been.calledOnce')

    // confirm the page has reloaded
    cy.contains('hello world 2')
  })
})
