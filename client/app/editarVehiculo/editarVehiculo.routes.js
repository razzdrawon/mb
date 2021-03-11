'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/editarVehiculo', {
      template: '<editar-vehiculo></editar-vehiculo>'
    });
}
