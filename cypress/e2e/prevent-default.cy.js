import 'cypress-real-events'

describe('Stub preventDefault', () => {
  beforeEach(() => {
    const beforeLoad = cy.stub().as('beforeLoad')
    const unloadPreventDefault = cy.stub().as('unloadPreventDefault')

    cy.on('window:before:load', (win) => {
      beforeLoad()
      cy.stub(win.BeforeUnloadEvent.prototype, 'preventDefault').callsFake(
        unloadPreventDefault,
      )
    })
  })

  it('asks the user before navigating away', () => {
    cy.visit('/index2')
    cy.get('@beforeLoad').should('have.been.calledOnce')
    cy.contains('button', 'Click').realClick()
    cy.contains('hello world 2')
    cy.get('@unloadPreventDefault').should('not.have.been.called')

    cy.reload()
    cy.get('@beforeLoad').should('have.been.calledTwice')
    cy.get('@unloadPreventDefault').should('have.been.calledOnce')
    cy.contains('hello world 2')
  })
})
