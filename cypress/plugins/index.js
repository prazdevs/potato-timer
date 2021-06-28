/* eslint-disable no-console */
/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  console.log(config)

  return config
}
