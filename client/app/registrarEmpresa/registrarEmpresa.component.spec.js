'use strict';

describe('Component: RegistrarEmpresaComponent', function() {
  // load the controller's module
  beforeEach(module('metrobusApp.registrarEmpresa'));

  var RegistrarEmpresaComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    RegistrarEmpresaComponent = $componentController('registrarEmpresa', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
