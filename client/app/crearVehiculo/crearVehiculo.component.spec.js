'use strict';

describe('Component: CrearVehiculoComponent', function() {
  // load the controller's module
  beforeEach(module('panelWebApp.crearVehiculo'));

  var CrearVehiculoComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CrearVehiculoComponent = $componentController('crearVehiculo', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
