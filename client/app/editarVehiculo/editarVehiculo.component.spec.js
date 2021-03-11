'use strict';

describe('Component: EditarVehiculoComponent', function() {
  // load the controller's module
  beforeEach(module('panelWebApp.editarVehiculo'));

  var EditarVehiculoComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    EditarVehiculoComponent = $componentController('editarVehiculo', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
