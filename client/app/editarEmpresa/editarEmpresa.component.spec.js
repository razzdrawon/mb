'use strict';

describe('Component: EditarEmpresaComponent', function() {
  // load the controller's module
  beforeEach(module('metrobusApp.editarEmpresa'));

  var EditarEmpresaComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    EditarEmpresaComponent = $componentController('editarEmpresa', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
