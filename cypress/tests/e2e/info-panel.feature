Feature: Info Panel

  Scenario: Info panel can be open and closed with mouse
    When I click on the button 'about the app'
    Then I should see 'What is Potato Timer ?'
    And I should see 'The Pomodoro technique'
    And I should see 'The origin of the Potato Timer'
    And I should see 'A word from the developer'
    When I click on the button 'close the modal'

  Scenario: Info panel can be open and closed with keyboard
    When I focus on the button 'about the app'
    And I press the 'enter' key
    Then I should see 'What is Potato Timer ?'
    When I press the 'esc' key

  Scenario: Info panel should have the links
    When I click on the button 'about the app'
    Then I should see a link 'contact me' to 'https://twitter.com/prazdevs'
    And I should see a link 'contribute' to 'https://github.com/prazdevs/potato-timer'
    And I should see a link 'offer me a coffee' to 'https://ko-fi.com/prazdevs'
  