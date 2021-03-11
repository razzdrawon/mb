'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/timeTable/:rid/:mid', {
      template: '<time-table></time-table>'
    });
}
