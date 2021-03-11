'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/crearUnidad', {
      template: '<crear-unidad></crear-unidad>'
    });
}
