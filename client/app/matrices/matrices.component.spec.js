'use strict';

describe('Component: MatricesComponent', function() {
  // load the controller's module
  beforeEach(module('metrobusApp.matrices'));

  var MatricesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    MatricesComponent = $componentController('matrices', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
