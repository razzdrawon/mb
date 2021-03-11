'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './editarUnidad.routes';

export class EditarUnidadComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('metrobusApp.editarUnidad', [ngRoute])
  .config(routes)
  .controller('editarUnidadCtrl', function ($http,$scope) {
    $http.get('/api/unidades/')
    .then(res => {
      console.log(res.data);
      var tempData = []
      for (var i = 0; i < res.data.length; i++) {
        tempData.push([res.data[i].modelo,res.data[i].marca,res.data[i].matricula,res.data[i].tipoDeVehiculo,res.data[i].empresaID.name,"<a class='btn btn-primary' href='/crearUnidad?edit="+ res.data[i]._id +"'>Editar</a>"])
      }
      console.log(tempData);
      $('#example23').DataTable({
          data: tempData,
          columns: [
            { title: "Modelo" },
            { title: "Marca" },
            { title: "Matricula" },
            { title: "Tipo de vehiculo" },
            { title: "Empresa" },
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
  .component('editarUnidad', {
    template: require('./editarUnidad.html'),
    controller: 'editarUnidadCtrl'
  })
  .name;
