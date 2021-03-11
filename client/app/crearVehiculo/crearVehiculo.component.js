'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './crearVehiculo.routes';

export class CrearVehiculoComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('metrobusApp.crearVehiculo', [ngRoute])
  .config(routes)
  .controller('crearVehiculoCtrl', function ($scope, $http,$routeParams, $window) {
    $scope.vehicle = {};

    $scope.isEdit = false;

    // console.log($routeParams);
    if ($routeParams.edit) {
      console.log($routeParams);
      $scope.isEdit = true;
      $http.get('/api/vehiculos/' + $routeParams.edit)
        .then(res =>{
          console.log(res);
          $scope.vehicle = res.data;
        })
        .catch(err => {
          console.log(err);
        })
    }

    $scope.register = function () {
      if ($scope.isEdit) {
        $http.patch('/api/vehiculos/'+ $routeParams.edit, $scope.vehicle)
          .then(function (res) {
            console.log(res);
            swal("Exito", "Se edito de manera exitosa", "success")
              .then(() =>{
                $window.location.href = '/editarVehiculo';
              });
          })
          .catch(function (err) {
            swal("Error", "Hubo un error", "success");
            console.log(err);
          })
      } else {
        $http.post('/api/vehiculos', $scope.vehicle)
          .then(function (res) {
            console.log(res);
            swal("Exito", "Se creo de manera exitosa", "success");
            $scope.vehicle = {};
          })
          .catch(function (err) {
            swal("Error", "Hubo un error", "success");
            console.log(err);
          })
      }
    }

  })
  .component('crearVehiculo', {
    template: require('./crearVehiculo.html'),
    controller: 'crearVehiculoCtrl'
  })
  .name;
