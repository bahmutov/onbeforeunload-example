import 'cypress-real-events'

describe('Stub preventDefault', () => {
  beforeEach(() => {
    const stub = cy.stub().as('preventDefault')

    cy.on('window:before:load', (win) => {
      console.log('stubbing preventDefault')
      cy.stub(win.BeforeUnloadEvent.prototype, 'preventDefault').callsFake(stub)
    })
  })

  it('asks the user before navigating away', () => {
    cy.visit('/index2')
    cy.contains('button', 'Click').realClick()
    cy.get('@preventDefault').should('not.have.been.called')

    cy.reload()
    // confirm the application code has called preventDefault on the unload event
    cy.get('@preventDefault').should('have.been.calledOnce')

    cy.reload()
    cy.get('@preventDefault').should('have.been.calledTwice')
  })
})
