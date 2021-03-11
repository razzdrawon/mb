'use strict';

describe('Component: EditarUnidadComponent', function() {
  // load the controller's module
  beforeEach(module('metrobusApp.editarUnidad'));

  var EditarUnidadComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    EditarUnidadComponent = $componentController('editarUnidad', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
