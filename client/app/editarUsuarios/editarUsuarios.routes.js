'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/editarUsuarios', {
      template: '<editar-usuarios></editar-usuarios>'
    });
}
