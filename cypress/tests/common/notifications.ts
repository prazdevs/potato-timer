import { Given } from 'cypress-cucumber-preprocessor/steps'

Given('the notifiations API is not available', () => {
  cy.visit('/', {
    onBeforeLoad(win) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete win.Notification
    },
  })
})
