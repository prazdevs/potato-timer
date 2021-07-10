Feature: Notifications warning

  Scenario: Alert displays 'Incompatibility' if API unavailable
    Given the notifiations API is not available
    Then I should see 'Incompatibility'
