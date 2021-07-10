import { Then } from 'cypress-cucumber-preprocessor/steps'

//* common display

Then('I should see {string}', text => {
  cy.findByText(text).should('exist')
})

Then('I should not see {string}', text => {
  cy.findByText(text).should('not.exist')
})

Then('I should see a link {string} to {string}', (label, link) => {
  cy.findByRole('link', { name: new RegExp(label, 'i') }).should(
    'have.attr',
    'href',
    link
  )
})

//* tasks display

Then('I should see the task {string}', task => {
  cy.get('.tasks-list').within(() => {
    cy.findByText(task).should('exist')
  })
})

Then('I should not see the task {string}', task => {
  cy.get('.tasks-list').within(() => {
    cy.findByText(task).should('not.exist')
  })
})

Then('the task {string} should be {string}', (task, state) => {
  if (!['todo', 'done'].includes(state)) throw new Error('invalid task state')

  cy.get('.tasks-list').within(() => {
    cy.findByText(task).should(
      'have.css',
      'text-decoration-line',
      state === 'done' ? 'line-through' : 'none'
    )
  })
})

//* language display

Then('the page lang should be {string}', locale => {
  cy.get('html').should('have.attr', 'lang', locale)
})
