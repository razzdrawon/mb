'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/editarUnidad', {
      template: '<editar-unidad></editar-unidad>'
    });
}
