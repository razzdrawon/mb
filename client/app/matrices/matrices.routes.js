'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/matrices/:id', {
      template: '<matrices></matrices>'
    });
}
