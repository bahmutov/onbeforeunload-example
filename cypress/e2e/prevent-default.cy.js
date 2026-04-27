describe('Stub preventDefault', () => {
  it('asks the user before navigating away', () => {
    cy.visit('/index2.html')
  })
})
