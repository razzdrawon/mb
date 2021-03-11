'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import 'angular-socket-io';
const ngRoute = require('angular-route');

import uiBootstrap from 'angular-ui-bootstrap';
import 'angular-validation-match';

import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import MatricesComponent from './matrices/matrices.component';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import registerUser from './registerUser/registerUser.component';
import registerEmpresa from './registrarEmpresa/registrarEmpresa.component';
import registerRuta from './registrarRuta/registrarRuta.component';
import registerVehiculo from './crearVehiculo/crearVehiculo.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import EditarEmpresaComponent from './editarEmpresa/editarEmpresa.component';
import EditarRutaComponent from './editarRuta/editarRuta.component';
import EditarVehiculoComponent from './editarVehiculo/editarVehiculo.component';
import TimeTableComponent from './timeTable/timeTable.component';
import EditarUsuariosComponent from './editarUsuarios/editarUsuarios.component';
import CrearUnidadComponent from './crearUnidad/crearUnidad.component';
import EditarUnidadComponent from './editarUnidad/editarUnidad.component';
import socket from '../components/socket/socket.service';
import TimeTableCreationComponent from './timeTableCreation/timeTableCreation.component';

import './app.css';

angular.module('metrobusApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io', ngRoute,
  uiBootstrap, _Auth, account, admin, 'validation.match', navbar, footer, main, constants,
  socket, util, registerUser, registerEmpresa, registerRuta, registerVehiculo, EditarEmpresaComponent, EditarRutaComponent,
  EditarVehiculoComponent, EditarUsuariosComponent, CrearUnidadComponent, EditarUnidadComponent, TimeTableComponent, MatricesComponent,
  TimeTableCreationComponent
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth, socket) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    console.log($location.$$path);
    // Auth.isLoggedIn(function(loggedIn) {
    //   console.log(loggedIn);
    //   if(!loggedIn && $location.$$path != "/signup") {
    //     $location.path('/login');
    //   }
    // });

  });


angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['metrobusApp'], {
      // strictDi: true
    });
  });
