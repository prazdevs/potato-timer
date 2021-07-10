Feature: Theme switching

  Scenario: Default light theme can be switched to dark and saved
    Given the theme is 'light'
    When I click on the button 'change theme'
    Then the theme should be 'dark'
    And theme should be saved as 'dark'

  Scenario: Default dark theme can be switched to light and saved
    Given the theme is 'dark'
    When I click on the button 'change theme'
    Then the theme should be 'light'
    And theme should be saved as 'light'