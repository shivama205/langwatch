Feature: Drawer transparency and blur
  As a user
  I want drawers to be semi-transparent with a blur effect
  So that I can maintain spatial context of the content behind the drawer

  Background:
    Given the application is loaded

  @integration
  Scenario: Drawer panel is semi-transparent with blurred background
    When a drawer opens
    Then the content behind the drawer appears blurred
    And the drawer panel is semi-transparent so background content is visible
