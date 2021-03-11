'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './crearUnidad.routes';

export class CrearUnidadComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('metrobusApp.crearUnidad', [ngRoute])
  .config(routes)
  .controller('crearUnidadCtrl', function ($scope, $http, $window, $routeParams) {
    $scope.camiones = [{
      nombre: 'Articulado - 160',
      capacidad: 160
    }, {
      nombre: 'Biarticulado - 240',
      capacidad: 240
    }, {
      nombre: 'Autobús convencional - 90',
      capacidad: 90
    }, {
      nombre: 'Doble piso - 140',
      capacidad: 140
    }];
    $scope.data = {};
    $scope.empresas

    $http.get('/api/empresas/')
      .then(function (res) {
        console.log(res);
        $scope.empresas = res.data
      })
      .catch(function(err){
        console.log(err);
      })

    if ($routeParams.edit) {
      console.log($routeParams);
      $scope.isEdit = true;
      $http.get('/api/unidades/' + $routeParams.edit)
        .then(res =>{
          console.log(res);
          $scope.data = res.data;
          for (var i = 0; i < $scope.camiones.length; i++) {
             if ($scope.camiones[i].nombre == $scope.data.tipoDeVehiculo) {
               $scope.cam = $scope.camiones[i];
             }
          }
        })
        .catch(err => {
          console.log(err);
        })
    }

    $scope.setValue = function () {
      console.log($scope.cam);
      $scope.data.capacidad = $scope.cam.capacidad
      $scope.data.tipoDeVehiculo = $scope.cam.nombre
      console.log($scope.data);
    }

    $scope.register = function () {
      if ($scope.isEdit) {
        $http.patch('/api/unidades/'+ $routeParams.edit, $scope.data)
          .then(function (res) {
            console.log(res);
            swal("Exito", "Se edito de manera exitosa", "success")
              .then(() =>{
                $window.location.href = '/editarUnidad';
              });
          })
          .catch(function (err) {
            swal("Error", "Hubo un error", "success");
            console.log(err);
          })
      } else {
        console.log($scope.data);
        $http.post('/api/unidades', $scope.data)
        .then(function (res) {
          console.log(res);
          swal("Exito", "Se edito de manera exitosa", "success")
            .then(() =>{
              $window.location.href = '/editarUnidad';
            });
        })
        .catch(function (err) {
          swal("Error", "Hubo un error", "error");

          console.log(err);
        })
      }
    }
  })
  .component('crearUnidad', {
    template: require('./crearUnidad.html'),
    controller:  'crearUnidadCtrl'
  })
  .name;
