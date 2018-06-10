describe('BasicSearchBar', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.get('input').type('kygo{enter}')
    cy.contains('I See Fire')
  })
})
