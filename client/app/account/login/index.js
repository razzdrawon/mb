'use strict';

import angular from 'angular';
import LoginController from './login.controller';

export default angular.module('metrobusApp.login', [])
  .controller('LoginController', function($scope, $http, $location, Auth, $route, $window, $routeParams) {

    //login
    // $scope.forget = false;
    // if ($routeParams.preRegister == '1') {
    //   $scope.preRegister = true;
    // } else {
    //   $scope.preRegister = false;
    //
    // console.log($scope.modo);
    // console.log($routeParams);
    Auth.logout();
    $scope.user = {};
    $scope.user.email = "admin@example.com"; // NOTE: QUITA ESTO EN PRODUCCION
    $scope.user.password = "admin"; // NOTE: QUITA ESTO EN PRODUCCION

    $scope.login = function(form) {
      Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(user => {
          console.log(user);
          $window.location.href = '/';
        })
        .catch(err => {
          // this.errors.login = err.message;
          if (err.message == 'Missing credentials') {
            err.message = "Faltan credenciales"
          }
          swal("Hubo un error",err.message,"error")
          console.log(err);
        });
    }
  })
  .name;
