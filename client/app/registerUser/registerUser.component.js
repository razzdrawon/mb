'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './registerUser.routes';

export class RegisterUserComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('metrobusApp.registerUser', [ngRoute])
  .config(routes)
  .controller('registerUserCtrl', function ($scope, $http, $routeParams,$location, $window) {
    $scope.user = {};
    $scope.user.rutas = [];
    $scope.isEdit = false;
    $scope.empresas

    $http.get('/api/rutas/')
      .then(function (res) {
        console.log(res);
        $scope.rutas = res.data
      })
      .catch(function(err){
        console.log(err);
      })

    // console.log($routeParams);
    if ($routeParams.edit) {
      console.log($routeParams);
      $scope.isEdit = true;
      $http.get('/api/users/userData/' + $routeParams.edit)
        .then(res =>{
          console.log(res);
          $scope.user = res.data;
        })
        .catch(err => {
          console.log(err);
        })
    }

    $scope.agregarRuta = function (value) {
      $scope.user.rutas.push({_id:$scope.rutaSelected._id, name:$scope.rutaSelected.name});
      console.log($scope.user);
    }

    $scope.eliminarRuta = function (index) {
      $scope.user.rutas.splice(index, 1);
    }

    $scope.register = function () {
      if ($scope.isEdit) {
        $http.post('/api/users/editUser/' + $routeParams.edit, $scope.user)
          .then(function (res) {
            console.log(res);
            swal("Exito", "Se edito de manera exitosa", "success")
              .then(() =>{
                $window.location.href = '/editarUsuarios';
              });
          })
          .catch(function (err) {
            swal("Error", "Hubo un error", "error");

            console.log(err);
          })
      } else {
        $http.post('/api/users', $scope.user)
          .then(function (res) {
            console.log(res);
            swal("Exito", "Se creo de manera exitosa", "success");
            $scope.user = {};
          })
          .catch(function (err) {
            swal("Error", "Hubo un error", "error");

            console.log(err);
          })
      }

    }
  })
  .component('registerUser', {
    template: require('./registerUser.html'),
    controller: 'registerUserCtrl'
  })
  .name;
