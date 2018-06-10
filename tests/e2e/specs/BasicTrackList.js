describe('BasicTrackList', () => {
  it('loads the tracks list', () => {
    cy.visit('/')
    cy.get('body > div > section').should('exist')
    cy.get('body > div > section:first-of-type').find('.loading').should('not.exist')
    cy.get('body > div > section:first-of-type').find('.equalizer').should('not.exist')
  })

  it('can play and pause songs', () => {
    cy.visit('/')
    cy.get('body > div > section:first-of-type').click()
    // cy.get('body > div > section:first-of-type').find('.loading').should('exist')
    cy.get('body > div > section:first-of-type').find('.equalizer').should('exist')
    cy.wait(1000)

    cy.get('body > div > section:first-of-type').click()
    cy.get('body > div > section:first-of-type').find('.loading').should('not.exist')
    cy.get('body > div > section:first-of-type').find('.equalizer').should('not.exist')
  })
})
