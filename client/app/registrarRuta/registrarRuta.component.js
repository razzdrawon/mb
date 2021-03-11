'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './registrarRuta.routes';

export default angular.module('metrobusApp.registrarRuta', [ngRoute])
  .config(routes)
  .controller('registrarRutaCtrl', function ($scope, $http, $window, $routeParams) {
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
    $scope.data.tiempoDeRecoridoAB = 0;
    $scope.data.tiempoDeRetornoB = 0;
    $scope.data.tiempoDeRecoridoBA = 0;
    $scope.data.tiempoDeRetornoA = 0;
    $scope.$watch('data.tiempoDeRecoridoAB', function () {
      $scope.data.tiempoDeCiclo = parseInt($scope.data.tiempoDeRecoridoAB) + parseInt($scope.data.tiempoDeRetornoB) + parseInt($scope.data.tiempoDeRecoridoBA) + parseInt($scope.data.tiempoDeRetornoA);
    })
    $scope.$watch('data.tiempoDeRetornoB', function () {
      $scope.data.tiempoDeCiclo = parseInt($scope.data.tiempoDeRecoridoAB) + parseInt($scope.data.tiempoDeRetornoB) + parseInt($scope.data.tiempoDeRecoridoBA) + parseInt($scope.data.tiempoDeRetornoA);
    })
    $scope.$watch('data.tiempoDeRecoridoBA', function () {
      $scope.data.tiempoDeCiclo = parseInt($scope.data.tiempoDeRecoridoAB) + parseInt($scope.data.tiempoDeRetornoB) + parseInt($scope.data.tiempoDeRecoridoBA) + parseInt($scope.data.tiempoDeRetornoA);
    })
    $scope.$watch('data.tiempoDeRetornoA', function () {
      $scope.data.tiempoDeCiclo = parseInt($scope.data.tiempoDeRecoridoAB) + parseInt($scope.data.tiempoDeRetornoB) + parseInt($scope.data.tiempoDeRecoridoBA) + parseInt($scope.data.tiempoDeRetornoA);
    })
    if ($routeParams.edit) {
      console.log($routeParams);
      $scope.isEdit = true;
      $http.get('/api/rutas/' + $routeParams.edit)
        .then(res =>{
          console.log(res);
          $scope.data = res.data;
          for (var i = 0; i < $scope.camiones.length; i++) {
             if ($scope.camiones[i].nombre == $scope.data.tipoDeCamion) {
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
      $scope.data.capacidadDeCamiones = $scope.cam.capacidad
      $scope.data.tipoDeCamion = $scope.cam.nombre
      console.log($scope.data);
    }

    $scope.register = function () {
      if ($scope.isEdit) {
        $http.patch('/api/rutas/'+ $routeParams.edit, $scope.data)
          .then(function (res) {
            console.log(res);
            swal("Exito", "Se edito de manera exitosa", "success")
              .then(() =>{
                $window.location.href = '/editarRuta';
              });
          })
          .catch(function (err) {
            swal("Error", "Hubo un error", "success");
            console.log(err);
          })
      } else {
        console.log($scope.data);
        $http.post('/api/rutas', $scope.data)
        .then(function (res) {
          console.log(res);
          swal("Exito", "Se edito de manera exitosa", "success")
            .then(() =>{
              $window.location.href = '/editarRuta';
            });
        })
        .catch(function (err) {
          swal("Error", "Hubo un error", "error");

          console.log(err);
        })
      }
    }
  })
  .component('registrarRuta', {
    template: require('./registrarRuta.html'),
    controller: 'registrarRutaCtrl'
  })
  .name;
