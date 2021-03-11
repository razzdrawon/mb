'use strict';

describe('Component: RegisterUserComponent', function() {
  // load the controller's module
  beforeEach(module('metrobusApp.registerUser'));

  var RegisterUserComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    RegisterUserComponent = $componentController('registerUser', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
