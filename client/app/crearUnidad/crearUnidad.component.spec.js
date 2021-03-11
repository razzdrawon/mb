'use strict';

describe('Component: CrearUnidadComponent', function() {
  // load the controller's module
  beforeEach(module('metrobusApp.crearUnidad'));

  var CrearUnidadComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CrearUnidadComponent = $componentController('crearUnidad', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
