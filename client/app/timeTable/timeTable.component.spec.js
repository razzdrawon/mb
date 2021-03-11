'use strict';

describe('Component: TimeTableComponent', function() {
  // load the controller's module
  beforeEach(module('metrobusApp.timeTable'));

  var TimeTableComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    TimeTableComponent = $componentController('timeTable', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
