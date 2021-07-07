import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(/^i'm on the main page/i, () => {
  cy.visit('/')
})
