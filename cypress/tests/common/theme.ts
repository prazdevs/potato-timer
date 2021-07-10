import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

Given('the theme is {string}', mode => {
  if (!['dark', 'light'].includes(mode)) return

  cy.visit('/', {
    onBeforeLoad(win) {
      cy.stub(win, 'matchMedia')
        .withArgs('(prefers-color-scheme: dark)')
        .returns({ matches: mode === 'dark', addListener: cy.stub() })
    },
  })
})

Then('the theme should be {string}', mode => {
  if (!['dark', 'light'].includes(mode)) return

  cy.get('body').should(
    'have.css',
    'background-color',
    mode === 'dark' ? 'rgb(16, 16, 20)' : 'rgb(255, 255, 255)'
  )
})
