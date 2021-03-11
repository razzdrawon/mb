'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/editarEmpresa', {
      template: '<editar-empresa></editar-empresa>'
    });
}
