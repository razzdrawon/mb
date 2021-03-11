'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/editarRuta', {
      template: '<editar-ruta></editar-ruta>'
    });
}
