const cucumber = require('cypress-cucumber-preprocessor').default

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on('file:preprocessor', cucumber())

  // on('before:browser:launch', (browser, launchOptions) => {
  //   if (browser.family === 'chromium') {
  //     launchOptions.args.push('--force-dark-mode=true')
  //     return launchOptions
  //   }
  // })

  return config
}
