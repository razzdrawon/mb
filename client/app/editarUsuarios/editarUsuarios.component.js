'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './editarUsuarios.routes';

export class EditarUsuariosComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('metrobusApp.editarUsuarios', [ngRoute])
  .config(routes)
  .controller('editarUsuariosCtrl', function ($scope, $http) {
    $http.get('/api/users/')
    .then(res => {
      console.log(res.data);
      var tempData = []
      for (var i = 0; i < res.data.length; i++) {
        tempData.push([res.data[i].name,res.data[i].email,"<a class='btn btn-primary' href='/registerUser?edit="+ res.data[i]._id +"'>Editar</a>"])
      }
      console.log(tempData);
      $('#example23').DataTable({
          data: tempData,
          columns: [
            { title: "Nombre" },
            { title: "Email" },
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
  .component('editarUsuarios', {
    template: require('./editarUsuarios.html'),
    controller: 'editarUsuariosCtrl'
  })
  .name;
