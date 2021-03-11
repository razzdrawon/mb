'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/registrarEmpresa', {
      template: '<registrar-empresa></registrar-empresa>'
    });
}
