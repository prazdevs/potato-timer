/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cucumber = require('cypress-cucumber-preprocessor').default

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on('file:preprocessor', cucumber())

  return config
}
