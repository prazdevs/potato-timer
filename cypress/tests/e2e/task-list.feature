Feature: Task list

  Scenario: Tasks can be added and saved
    When I type 'enter task' in the field 'add task'
    And I press the 'enter' key
    Then I should see the task 'enter task'
    And task 'enter task' should be saved
    When I type 'click task' in the field 'add task'
    And I click on the button 'add task'
    Then I should see the task 'click task'
    And task 'click task' should be saved

  Scenario: Tasks can be removed
    Given the following tasks are saved:
      | a permanent task |
      | a deletable task |
    When I click on the button 'delete task "a deletable task"'
    Then I should not see the task 'a deletable task'
    And I should see the task 'a permanent task'

  Scenario: Tasks can be checked
    Given the following tasks are saved:
      | a done task |
      | a todo task |
    When I click on the task 'a done task'
    Then the task 'a done task' should be 'done'
    And the task 'a todo task' should be 'todo'