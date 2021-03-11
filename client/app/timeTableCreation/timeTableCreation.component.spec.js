'use strict';

describe('Component: TimeTableCreationComponent', function() {
  // load the controller's module
  beforeEach(module('metrobusApp.timeTableCreation'));

  var TimeTableCreationComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    TimeTableCreationComponent = $componentController('timeTableCreation', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
