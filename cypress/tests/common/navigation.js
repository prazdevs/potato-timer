import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(/^I'm on the main page/i, () => {
  cy.visit('/')
})
