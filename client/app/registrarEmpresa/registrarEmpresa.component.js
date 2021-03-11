'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './registrarEmpresa.routes';

export class RegistrarEmpresaComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('metrobusApp.registrarEmpresa', [ngRoute])
  .config(routes)
  .controller('registrarEmpresaCtrl', function ($scope, $http,$routeParams, $window) {
    $scope.data = {};

    $scope.isEdit = false;

    // console.log($routeParams);
    if ($routeParams.edit) {
      console.log($routeParams);
      $scope.isEdit = true;
      $http.get('/api/empresas/' + $routeParams.edit)
        .then(res =>{
          console.log(res);
          $scope.data = res.data;
        })
        .catch(err => {
          console.log(err);
        })
    }

    $scope.register = function () {
      if ($scope.isEdit) {
        $http.patch('/api/empresas/'+ $routeParams.edit, $scope.data)
          .then(function (res) {
            console.log(res);
            swal("Exito", "Se edito de manera exitosa", "success")
              .then(() =>{
                $window.location.href = '/editarEmpresa';
              });
          })
          .catch(function (err) {
            swal("Error", "Hubo un error", "success");
            console.log(err);
          })
      } else {
        $http.post('/api/empresas', $scope.data)
          .then(function (res) {
            console.log(res);
            swal("Exito", "Se creo de manera exitosa", "success");
            $scope.data = {};
          })
          .catch(function (err) {
            swal("Error", "Hubo un error", "success");
            console.log(err);
          })
      }
    }
  })
  .component('registrarEmpresa', {
    template: require('./registrarEmpresa.html'),
    controller: 'registrarEmpresaCtrl'
  })
  .name;
