import { When } from 'cypress-cucumber-preprocessor/steps'

When('I click on the button {string}', (label) => {
  cy.findByRole('button', { name: new RegExp(label, 'i') }).click()
})
