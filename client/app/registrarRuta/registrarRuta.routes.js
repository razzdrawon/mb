'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/registrarRuta', {
      template: '<registrar-ruta></registrar-ruta>'
    });
}
