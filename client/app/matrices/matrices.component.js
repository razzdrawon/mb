'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './matrices.routes';

export class MatricesComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('metrobusApp.matrices', [ngRoute])
  .config(routes)
  .controller('matricesCtrl', function ($routeParams, $scope, $http, Auth) {
    $scope.ruta = {};
    Auth.getCurrentUser(function (user) {
      $scope.userData = user;
    })
    $http.get('/api/rutas/' + $routeParams.id)
      .then(function (res) {
        console.log(res);
        $scope.ruta = res.data;
        var tempData = []
        for (var i = 0; i < res.data.matriz.length; i++) {
          console.log(res.data.matriz[i]);
          tempData.push([res.data.matriz[i].fecha,res.data.matriz[i].volumenDeDiseno,res.data.matriz[i].numeroDeCamiones,res.data.matriz[i].intervalo,res.data.matriz[i].tipo, "<a class='btn btn-primary' href='/timeTable/"+$routeParams.id+"/"+ res.data.matriz[i]._id +"'>Ver</a>"])
        }
        console.log(tempData);
        $('#example23').DataTable({
            data: tempData,
            columns: [
              { title: "Fecha" },
              { title: "Volumen de diseño" },
              { title: "Numero de camiones" },
              { title: "Intervalo" },
              { title: "Tipo" },
              { title: "Acciones" },
            ],
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        });
      })
      .catch(function (err) {
        console.log(err);
      })
  })
  .component('matrices', {
    template: require('./matrices.html'),
    controller:'matricesCtrl'
  })
  .name;
