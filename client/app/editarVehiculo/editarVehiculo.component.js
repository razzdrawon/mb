'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './editarVehiculo.routes';

export class EditarVehiculoComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('metrobusApp.editarVehiculo', [ngRoute])
  .config(routes)
  .controller('editarVehiculoCtrl', function($scope, $http) {
    $http.get('/api/vehiculos/')
    .then(res => {
      console.log(res.data);
      var tempData = []
      for (var i = 0; i < res.data.length; i++) {
        tempData.push([res.data[i].name,res.data[i].capacidad,"<a class='btn btn-primary' href='/crearVehiculo?edit="+ res.data[i]._id +"'>Editar</a>"])
      }
      console.log(tempData);
      $('#example23').DataTable({
          data: tempData,
          columns: [
            { title: "Nombre" },
            { title: "Capacidad" },
            { title: "Acciones" },
          ],
          dom: 'Bfrtip',
          buttons: [
              'copy', 'csv', 'excel', 'pdf', 'print'
          ]
      });
    })
    .catch(err => {
      console.log(err);
    })
  })
  .component('editarVehiculo', {
    template: require('./editarVehiculo.html'),
    controller: 'editarVehiculoCtrl'
  })
  .name;
