'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './editarEmpresa.routes';

export class EditarEmpresaComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('metrobusApp.editarEmpresa', [ngRoute])
  .config(routes)
  .controller('editarEmpresaCtrl', function ($http,$scope) {
    $http.get('/api/empresas/')
    .then(res => {
      console.log(res.data);
      var tempData = []
      for (var i = 0; i < res.data.length; i++) {
        tempData.push([res.data[i].name,res.data[i].address,res.data[i].phone,"<a class='btn btn-primary' href='/registrarEmpresa?edit="+ res.data[i]._id +"'>Editar</a>"])
      }
      console.log(tempData);
      $('#example23').DataTable({
          data: tempData,
          columns: [
            { title: "Nombre" },
            { title: "Direccion" },
            { title: "Telefono" },
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
  .component('editarEmpresa', {
    template: require('./editarEmpresa.html'),
    controller:  'editarEmpresaCtrl'
  })
  .name;
