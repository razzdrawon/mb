'use strict';

describe('Component: EditarUsuariosComponent', function() {
  // load the controller's module
  beforeEach(module('metrobusApp.editarUsuarios'));

  var EditarUsuariosComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    EditarUsuariosComponent = $componentController('editarUsuarios', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
