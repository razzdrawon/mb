'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/timeTableCreation/:id', {
      template: '<time-table-creation></time-table-creation>'
    });
}
