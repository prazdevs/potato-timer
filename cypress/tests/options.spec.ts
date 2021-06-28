describe('options', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('can change languages', () => {
    const button = cy.findByRole('button', {
      name: /change language — currently en/i,
    })

    button.click()

    button.should(
      'have.attr',
      'aria-label',
      'Changer de langue — actuellement FR',
    )
  })

  it('can change themes', () => {
    cy.findByRole('button', {
      name: /change theme — currently dark/i,
    }).click()

    cy.get('body').should(
      'have.css',
      'background-color',
      'rgb(255, 255, 255)',
    )

    cy.findByRole('button', {
      name: /change theme — currently light/i,
    }).click()

    cy.get('body').should(
      'have.css',
      'background-color',
      'rgb(16, 16, 20)')
  })

  describe('info panel', () => {
    it('can open/close with keyboard', () => {
      cy.findByRole('button', {
        name: /about the app/i,
      }).type('{enter}')

      cy.focused().type('{esc}')
    })

    it('can open/close with mouse', () => {
      cy.findByRole('button', {
        name: /about the app/i,
      }).click()

      cy.findByRole('button', { name: /close the modal/i }).click()
    })
  })
})
