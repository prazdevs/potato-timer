Feature: Potato settings

  Scenario: User can change the potato durations
    When I click on the button 'settings'
    And I type '1' in the field 'work potato duration'
    And I type '1' in the field 'pause potato duration'
    And I type '1' in the field 'final pause duration'
    And I click on the button 'save'
    Then local storage key 'potato-work-time' should have value '60'
    And local storage key 'potato-pause-time' should have value '60'
    And local storage key 'potato-long-pause' should have value '60'

  Scenario: User can reset the potato durations to defaults
    Given local storage key 'potato-work-time' has value '60'
    And local storage key 'potato-pause-time' has value '60'
    And local storage key 'potato-long-pause' has value '60'
    When I click on the button 'settings'
    And I click on the button 'restore default durations'
    And I click on the button 'save'
    Then local storage key 'potato-work-time' should have value '1500'
    And local storage key 'potato-pause-time' should have value '300'
    And local storage key 'potato-long-pause' should have value '900'
  