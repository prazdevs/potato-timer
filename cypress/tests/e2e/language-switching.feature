Feature: Language switching

  Scenario: The language can be switched
    When I click on the button 'change language'
    Then the page lang should be 'fr'
