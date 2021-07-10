import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

Given('local storage key {string} has value {string}', (key, value) => {
  localStorage.setItem(key, value)
})

Given('the following tasks are saved:', dataTable => {
  const tasks = dataTable.rawTable.map(e => ({
    text: e[0],
    done: false,
  }))
  localStorage.setItem('potato-tasks', JSON.stringify(tasks))
})

Then('theme should be saved as {string}', mode => {
  expect(localStorage.getItem('vueuse-color-scheme')).to.eq(mode)
})

Then('task {string} should be saved', task => {
  const tasks = JSON.parse(localStorage.getItem('potato-tasks')).map(
    t => t.text
  )
  expect(tasks).to.include(task)
})
