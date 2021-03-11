'use strict';

describe('Component: EditarRutaComponent', function() {
  // load the controller's module
  beforeEach(module('metrobusApp.editarRuta'));

  var EditarRutaComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    EditarRutaComponent = $componentController('editarRuta', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
