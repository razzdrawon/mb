'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/registerUser', {
      template: '<register-user></register-user>'
    });
}
