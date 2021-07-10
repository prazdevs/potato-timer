import { When } from 'cypress-cucumber-preprocessor/steps'

//* common interactions

When('I click on the button {string}', label => {
  cy.findByRole('button', { name: new RegExp(label, 'i') }).click()
})

When('I focus on the button {string}', label => {
  cy.findByRole('button', { name: new RegExp(label, 'i') }).focus()
})

When('I type {string} in the field {string}', (content, label) => {
  cy.findByRole('textbox', { name: new RegExp(label, 'i') }).type(content)
})

When('I press the {string} key', key => {
  cy.focused().type(`{${key}}`)
})

//* tasks interactions

When('I click on the task {string}', task => {
  cy.get('.tasks-list').within(() => {
    cy.findByText(task).click()
  })
})
