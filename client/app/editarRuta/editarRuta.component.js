'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './editarRuta.routes';

export class EditarRutaComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('metrobusApp.editarRuta', [ngRoute])
  .config(routes)
  .controller('editarRutaCtrl', function ($http,$scope, Auth) {
    $http.get('/api/rutas/')
    .then(res => {
      Auth.getCurrentUser(function (user) {
        console.log(user);
        $scope.userData = user;
        console.log(res.data);
        var tempData = []
        if ($scope.userData.rola == "admin") {
          for (var i = 0; i < res.data.length; i++) {
            tempData.push([res.data[i].name,res.data[i].tiempoDeCiclo,res.data[i].tipoDeCamion,res.data[i].factorDeOcupacion,"<a class='btn btn-primary' href='/registrarRuta?edit="+ res.data[i]._id +"'>Editar</a> <a class='btn btn-primary' href='/matrices/"+ res.data[i]._id +"'>Matiz</a>"])
          }
        } else {
          for (var i = 0; i < res.data.length; i++) {
            tempData.push([res.data[i].name,res.data[i].tiempoDeCiclo,res.data[i].tipoDeCamion,res.data[i].factorDeOcupacion,"<a class='btn btn-primary' href='/matrices/"+ res.data[i]._id +"'>Matiz</a>"])
          }
        }

        console.log(tempData);
        $('#example23').DataTable({
            data: tempData,
            columns: [
              { title: "Nombre" },
              { title: "Ciclo" },
              { title: "Tipo de Camion" },
              { title: "Factor de ocupacion" },
              { title: "Acciones" },
            ],
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        });
      })
    })
    .catch(err => {
      console.log(err);
    })
  })
  .component('editarRuta', {
    template: require('./editarRuta.html'),
    controller:'editarRutaCtrl'
  })
  .name;
