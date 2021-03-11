import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';



export default angular.module('metrobusApp.main', [ngRoute])
  .config(routing)
  .controller('MainController', function ($scope, $http, Auth, $location) {
    Auth.getCurrentUser(function (user) {
      if (user.role == 'admin') {
        $location.path('/registerUser');
      } else {
        $location.path('/editarRuta');
      }
    })
  })
  .component('main', {
    template: require('./main.html'),
    controller: 'MainController'
  })
  .name;
