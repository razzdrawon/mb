'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';



export default angular.module('directives.navbar', [])
  .controller('NavbarComponent', function (Auth, $scope) {
    Auth.getCurrentUser(function (user) {
      $scope.userData = user;
    })
  })
  .component('navbar', {
    template: require('./navbar.html'),
    controller: 'NavbarComponent'
  })
  .name;
