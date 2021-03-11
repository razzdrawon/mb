'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/crearVehiculo', {
      template: '<crear-vehiculo></crear-vehiculo>'
    });
}
