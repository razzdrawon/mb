'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './timeTableCreation.routes';

export class TimeTableCreationComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('metrobusApp.timeTableCreation', [ngRoute])
  .config(routes)
  .controller('timeTableCreationCtrl', function ($scope, $http, $routeParams, $window) {
    $scope.ruta = {};
    $scope.data = {};
    $scope.matriz = [];
    $scope.intervalo;
    $scope.NumeroDeCamiones;
    $scope.empresaSelect = "";
    $scope.empresasArray = [];
    $scope.totalPorcentage = 0;

    $scope.$watch('data.volumenDeDiseno', function () {
      var interval = ($scope.ruta.capacidadDeCamiones * ($scope.ruta.factorDeOcupacion / 100) * 60) / parseInt($scope.data.volumenDeDiseno)
      $scope.intervalo = Math.round(interval);
      $scope.intervaloOriginal = interval;
      $scope.NumeroDeCamiones = Math.floor($scope.ruta.tiempoDeCiclo / interval);
      $scope.data.intervalo = $scope.intervalo;
      $scope.data.numeroDeCamiones = $scope.NumeroDeCamiones;
    })
    $http.get('/api/rutas/' + $routeParams.id)
      .then(function (res) {
        $scope.ruta = res.data;
      })
      .catch(function (err) {
        console.log(err);
      })

    $http.get('/api/empresas/')
      .then(function (res) {
        console.log(res);
        $scope.empresas = res.data;
      })
      .catch(function (err) {
        console.log(err);
      })

    $scope.formatNumber = function (num) {
      if (num < 10) {
        return "0" + num;
      } else {
        return num;
      }
    }

    $scope.agregarEmpresa = function () {
      console.log($scope.empresaSelect);
      if ($scope.empresaSelect != "") {
        $scope.empresasArray.push({
          name: $scope.empresaSelect,
          porcentage: 0
        })
      } else {
        swal("Aviso","Seleccione una empresa primero", "warning");
      }
    }

    $scope.removeEmpresa = function (index) {
      $scope.empresasArray.splice(index,1);
      $scope.calulateTotalPorcentage();
    }

    $scope.saveEmpresas = function () {
      if ($scope.totalPorcentage == 100) {
        $scope.data.empresasParticipadoras = $scope.empresasArray;
        console.log($scope.data);
        $('#empresaModal').modal('hide');
      } else {
        swal("Aviso","El total debe de sumar 100%", "warning");
      }
    }
    $scope.deleteEmpresas = function () {
      $scope.empresasArray = [];
      $scope.calulateTotalPorcentage();
    }

    $scope.calulateTotalPorcentage = function () {
      $scope.totalPorcentage = 0;
      for (var i = 0; i < $scope.empresasArray.length; i++) {
        $scope.totalPorcentage += $scope.empresasArray[i].porcentage;
        console.log($scope.totalPorcentage);
      }
    }

    $scope.calcularSalidaPatio = function (tiempo) {
      console.log(tiempo);
      var temp = tiempo.split(":");
      var minutos = (parseInt(temp[0]) * 60) + parseInt(temp[1]);
      minutos -= $scope.ruta.tiempoDePatio;
      var HoraDeSalida = Math.floor(minutos / 60);
      var MinutoDeSalida = minutos % 60;
      var salidaPatio = $scope.formatNumber(HoraDeSalida) + ":" + $scope.formatNumber(MinutoDeSalida);
      return salidaPatio;
    }

    $scope.calcularLlegadaAPatio = function (tiempo) {
      console.log(tiempo);
      var temp = tiempo.split(":");
      var minutos = (parseInt(temp[0]) * 60) + parseInt(temp[1]);
      minutos += $scope.ruta.tiempoDePatio;
      var HoraDeSalida = Math.floor(minutos / 60);
      var MinutoDeSalida = minutos % 60;
      var salidaPatio = $scope.formatNumber(HoraDeSalida) + ":" + $scope.formatNumber(MinutoDeSalida);
      return salidaPatio;
    }


    $scope.calculateMatix = function () {
      if ($scope.data.volumenDeDiseno == undefined || $scope.data.volumenDeDiseno == "") {
        swal("Aviso", "Por favor ingrese el volumen de diseño antes de generar la matiz");
        return;
      }
      if ($scope.data.startHour == "" || $scope.data.startHour == undefined || $scope.data.endHour == "" || $scope.data.endHour == undefined ) {
        swal("Aviso", "Por favor ingrese la hora de inicio y finalizacion antes de generar la matiz");
        return;
      }

      var tempPartArr = [];
      for (var i = 0; i < $scope.data.empresasParticipadoras.length; i++) {
        var camiones = ($scope.data.empresasParticipadoras[i].porcentage / 100) * $scope.NumeroDeCamiones;
        tempPartArr.push({name:$scope.data.empresasParticipadoras[i].name , number: Math.round(camiones)})
      }
      $scope.distribucionDeEmpresas = [];
      while ($scope.distribucionDeEmpresas.length < $scope.NumeroDeCamiones) {
        for (var i = 0; i < tempPartArr.length ; i++) {
          console.log(i);
          if (tempPartArr[i].number > 0) {
            $scope.distribucionDeEmpresas.push(tempPartArr[i].name)
            tempPartArr[i].number = tempPartArr[i].number - 1
          }
        }
      }
      console.log($scope.distribucionDeEmpresas);

      $scope.matriz = [];
      // Primera parte de la preparacion, llenamos el array con el numero de camiones, un array por cada camion
      for (var i = 0; i < $scope.NumeroDeCamiones; i++) {
        $scope.matriz.push([]);
      }
      // Esta parte es para calcular los minutos transcurridos entre la hora inicial y la hora final
      var tempS = $scope.data.startHour.split(":");
      var tempE = $scope.data.endHour.split(":");
      var Shour =  parseInt(tempS[0]);
      var Smin = parseInt(tempS[1]);
      var Ehour = parseInt(tempE[0]);
      var Emin = parseInt(tempE[1]);
      var startTimeInMinutes = (Shour * 60) + Smin;
      var endTimeInMinutes = (Ehour * 60) + Emin;
      // Aqui contiene los minutos de la hora inicial a la hora final
      var minutosTotales = ((Ehour * 60) - (Shour * 60) + (Emin - Smin))
      // Numero de vueltas totales que hara
      var vueltas = (minutosTotales / $scope.intervaloOriginal) / $scope.NumeroDeCamiones;
      // Se redondea al Int mas proximo hacia arriba, si tiene decimales significa que algunos camiones daran mas vueltas que otros
      var vueltasRounded = Math.ceil(vueltas)
      // Array solo para el ng-repeat del header de vueltas en la tabla
      console.log(vueltasRounded);
      $scope.vueltasArr = new Array(vueltasRounded);
      // Preparacion final del array, a cada camion se le agrega un array con 2 arrays dentro por cada vuelta que vayan a haber
      // El primer array contendra las horas de llegada y salida de la estacion A
      // El segundo array contendra las horas de llegada y salida de la estacion b
      for (var i = 0; i < $scope.matriz.length; i++) {
        for (var x = 0; x < vueltasRounded; x++) {
          $scope.matriz[i].push([[],[]]);
        }
      }

      // Esta parte va a calcular cuantos minutos les hace falta a cada vuelta para completar el tiempo de ciclo, asi poder ajustar la matiz
      var DtAnterior = 0;
      var totalCounter = 0;
      var Tci = $scope.NumeroDeCamiones * $scope.intervalo;
      var NumeroDeAjustes = $scope.ruta.tiempoDeCiclo - Tci;
      // Checamos si se ocupa sumar o restar minutos
      if (NumeroDeAjustes > 0) {
        var positive = true;
      } else {
        var positive = false;
      }
      // Sacamos el numero absoluto
      NumeroDeAjustes = Math.abs(NumeroDeAjustes);
      // Aqui revisamos cada cuantas salidas ponemos intervalo mayor/menor. Es -1 por que la primera salida no se ajusta
      var intervaloEntreAjustes = Math.floor(($scope.NumeroDeCamiones - NumeroDeAjustes - 1) / NumeroDeAjustes);
      // Contador total de minutos agregados
      var NumeroDeMinutosAjustados = 0;

      // Inicia el proceso de calcular las horas
      // Este es el for al nivel de los Vueltas
      for (var x = 0; x < vueltasRounded; x++) {
        // Este Contador nos va dicendo cuantos ajustes tenemos que hacer esta vuelta, lo reseteamos al numero de ajustes cada vuelta.
        var NumeroDeAjustesTemp = NumeroDeAjustes;
        // Este Contador nos ayuda a saber cuantos intervalos llevamos sin hacer un ajuste, lo reseteamos a 0 cada vuelta
        var intervaloEntreAjustesTemp = 0;
        // Este es el for al nivel de los camiones
        for (var i = 0; i < $scope.NumeroDeCamiones; i++) {
          // Dt es la diferencia de la hora de salida del camion respecto a la hora de inicio
          // Dt = intervalo x el numero total de salidas hasta el momento
          var Dt = ($scope.intervalo * totalCounter) + NumeroDeMinutosAjustados;
          var Debug = false;

          // Checamos que no sea la primera corrida
          if (i != 0) {
            // Revisamos si ya toca hacer un ajuste, y si nos quedan ajustes que hacer
            if (NumeroDeAjustesTemp > 0 && intervaloEntreAjustesTemp >= intervaloEntreAjustes) {
              // Revisamos si la diferencia es positiva o negativa, y ajustamos el Dt segun el caso, asi como el numero total de ajustes
              if (positive) {
                Dt++;
                NumeroDeMinutosAjustados++;
              } else {
                Dt--;
                NumeroDeMinutosAjustados--;
              }
              // Le quitamos uno al contador de ajustes
              NumeroDeAjustesTemp--;
              // Y reseteamos el contador del intervalo de ajustes
              intervaloEntreAjustesTemp = 0;
            } else {
              // No es tiempo aun, aumentamos el contador
              intervaloEntreAjustesTemp++;
            }
          }

          // El tiempo de salida del camion es la hora de inicio mas la diferencia de tiempo (Dt)
          var tiempoDeSalidaEnMinutos = startTimeInMinutes + Dt;
          // Si la hora de salida es mayor a la hora final, ese camion ya no sale, setea las horas en vacio
          if (tiempoDeSalidaEnMinutos > endTimeInMinutes) {
            // Inicio de Estacion A
            // Salida
            $scope.matriz[i][x][0][0] = "";
            // Llegada
            $scope.matriz[i][x][0][1] = "";
            // Fin de Estacion A
            // Inicio de Estacion B
            // Llegada
            $scope.matriz[i][x][1][0] = "";
            // Salida
            $scope.matriz[i][x][1][1] = "";
            // Fin de Estacion B
          } else {
            var HoraDeSalidaA = Math.floor(tiempoDeSalidaEnMinutos / 60);
            var MinutoDeSalidaA = tiempoDeSalidaEnMinutos % 60;
            var HoraDeLlegadaA = Math.floor((tiempoDeSalidaEnMinutos + ($scope.ruta.tiempoDeRecoridoBA + $scope.ruta.tiempoDeRetornoB + $scope.ruta.tiempoDeRecoridoAB)) / 60);
            var MinutoDeLlegadaA = (tiempoDeSalidaEnMinutos + ($scope.ruta.tiempoDeRecoridoBA + $scope.ruta.tiempoDeRetornoB + $scope.ruta.tiempoDeRecoridoAB)) % 60;
            // Inicio de Estacion A
            // Salida
            if (Debug) {
              $scope.matriz[i][x][0][0] = $scope.formatNumber(HoraDeSalidaA) + ":" + $scope.formatNumber(MinutoDeSalidaA) + " *";
            } else {
              $scope.matriz[i][x][0][0] = $scope.formatNumber(HoraDeSalidaA) + ":" + $scope.formatNumber(MinutoDeSalidaA);
            }
            // Llegada
            $scope.matriz[i][x][0][1] = $scope.formatNumber(HoraDeLlegadaA) + ":" + $scope.formatNumber(MinutoDeLlegadaA);
            // Fin de Estacion A
            // Inicio de Estacion B
            var HoraDeSalidaB = Math.floor((tiempoDeSalidaEnMinutos + ($scope.ruta.tiempoDeRecoridoAB + $scope.ruta.tiempoDeRetornoB)) / 60);
            var MinutoDeSalidaB = (tiempoDeSalidaEnMinutos + ($scope.ruta.tiempoDeRecoridoAB + $scope.ruta.tiempoDeRetornoB)) % 60;
            var HoraDeLlegadaB = Math.floor((tiempoDeSalidaEnMinutos + $scope.ruta.tiempoDeRecoridoAB ) / 60);
            var MinutoDeLlegadaB = (tiempoDeSalidaEnMinutos + $scope.ruta.tiempoDeRecoridoAB) % 60;
            // Llegada
            $scope.matriz[i][x][1][0] = $scope.formatNumber(HoraDeLlegadaB) + ":" + $scope.formatNumber(MinutoDeLlegadaB);
            // Salida
            $scope.matriz[i][x][1][1] = $scope.formatNumber(HoraDeSalidaB) + ":" + $scope.formatNumber(MinutoDeSalidaB);
            // Fin de Estacion B
          }
          DtAnterior = Dt;
          totalCounter++;
        }
      }
    }

    $scope.saveMatrix = function () {
      console.log("xd");
      if ($scope.data.codigo == "" || $scope.data.codigo == undefined ||
          $scope.data.fecha == "" || $scope.data.fecha == undefined ||
          $scope.data.tipo == "" || $scope.data.tipo == undefined ||
          $scope.data.volumenDeDiseno == "" || $scope.data.volumenDeDiseno == undefined ||
          $scope.data.tipoDeCiclo == "" || $scope.data.tipoDeCiclo == undefined ||
          $scope.data.startHour == "" || $scope.data.startHour == undefined ||
          $scope.data.endHour == "" || $scope.data.endHour == undefined ||
          $scope.data.periodo == "" || $scope.data.periodo == undefined) {
            console.log($scope.data);
            swal("Aviso", "Por favor ingrese todos los datos antes de guardar");
            return;
      }
      $scope.data.matriz = $scope.matriz;
      $scope.data.distribucionDeEmpresas = $scope.distribucionDeEmpresas;
      $http.post('/api/rutas/addMatriz/'+ $routeParams.id, $scope.data)
        .then(function (res) {
          console.log(res);
          swal("Exito", "Se creo de manera exitosa", "success")
            .then(() =>{
              $window.location.href = '/matrices/' + $routeParams.id;
            });
        })
        .catch(function (err) {
          swal("Error", "Hubo un error", "error");
          console.log(err);
        })
    }


  })
  .component('timeTableCreation', {
    template: require('./timeTableCreation.html'),
    controller: 'timeTableCreationCtrl'
  })
  .name;
