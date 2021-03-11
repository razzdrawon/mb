'use strict';

describe('Component: RegistrarRutaComponent', function() {
  // load the controller's module
  beforeEach(module('metrobusApp.registrarRuta'));

  var RegistrarRutaComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    RegistrarRutaComponent = $componentController('registrarRuta', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
