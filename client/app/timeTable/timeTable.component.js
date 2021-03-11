'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './timeTable.routes';

export class TimeTableComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('metrobusApp.timeTable', [ngRoute])
  .config(routes)
  .controller('timeTableCtrl', function ($scope, $http, $routeParams) {
    $http.get('/api/rutas/' + $routeParams.rid)
      .then(function (res) {
      $scope.ruta = res.data;
      for (var i = 0; i < res.data.matriz.length; i++) {
        if (res.data.matriz[i]._id == $routeParams.mid){
          $scope.matriz = res.data.matriz[i].matriz;
          $scope.matrizData = res.data.matriz[i];
          console.log($scope.matrizData);
          $scope.vueltasArr = new Array(res.data.matriz[i].matriz[0].length);
        }
      }
      console.log($scope.matriz);
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

    $scope.calcularSalidaPatio = function (tiempo) {
      var temp = tiempo.split(":");
      var minutos = (parseInt(temp[0]) * 60) + parseInt(temp[1]);
      minutos -= $scope.ruta.tiempoDePatio;
      var HoraDeSalida = Math.floor(minutos / 60);
      var MinutoDeSalida = minutos % 60;
      var salidaPatio = $scope.formatNumber(HoraDeSalida) + ":" + $scope.formatNumber(MinutoDeSalida);
      return salidaPatio;
    }

    $scope.calcularLlegadaAPatio = function (tiempo) {
      var temp = tiempo.split(":");
      var minutos = (parseInt(temp[0]) * 60) + parseInt(temp[1]);
      minutos += $scope.ruta.tiempoDePatio;
      var HoraDeSalida = Math.floor(minutos / 60);
      var MinutoDeSalida = minutos % 60;
      var salidaPatio = $scope.formatNumber(HoraDeSalida) + ":" + $scope.formatNumber(MinutoDeSalida);
      return salidaPatio;
    }

    $scope.exportTable = function () {
      var alphabeth = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","AB","AC","AD","AE","AF","AG","AH","AI","AJ","AK","AL","AM","AN","AO","AP","AQ","AR","AS","AT","AU","AV","AW","AX","AY","AZ"];
      var data = [
        {1:'Codigo:',2:"",3:$scope.matrizData.codigo,4:'Tipo:',5:"",6:$scope.matrizData.tipo,7:'Tipo de ciclo:',8:"",9:$scope.matrizData.tipoDeCiclo,10:'Hora de inicio:',11:"",12:$scope.matrizData.startHour,13:'Intervalo:',14:"",15:$scope.matrizData.intervalo},
        {1:'Fecha:',2:"",3:$scope.matrizData.fecha,4:'Volumen de Diseño:',5:"",6:$scope.matrizData.volumenDeDiseno,7:'Periodo:',8:"",9:$scope.matrizData.periodo,10:'Hora de finalizacion:',11:"",12:$scope.matrizData.endHour,13:'Numero de camiones:',14:"",15:$scope.matrizData.numeroDeCamiones},
        {1:""},
        {1:"Corrida",2:"Empresa",3:"Origen/Destino", 4:"NumeroDeVueltas"},
      ]
      var temp = {1:"",2:""}
      var contState = true;
      var cont = 1;
      var merges = [];
      for (var i = 0; i < ($scope.matriz[0].length * 2); i++) {
        if (contState) {
          temp[i + 4] = cont;
          contState = false;
          cont++;
          merges.push({s: alphabeth[i + 3] + "5", e: alphabeth[i + 4] + "5"})
        } else {
          temp[i + 4] = "";
          contState = true;
        }
      }
      var contState = 3;
      for (var i = 0; i < ($scope.matriz.length * 3); i++) {
        if (contState == 3) {
          console.log({s: "A" + (i + 6), e: "A" + (i + 8)});
          merges.push({s: "A" + (i + 6), e: "A" + (i + 8)})
          merges.push({s: "B" + (i + 6), e: "B" + (i + 8)})
          contState = 1;
        } else {
          contState++;
        }
      }
      data.push(temp);
      for (var i = 0; i < $scope.matriz.length; i++) {
        var temp0 = {1:i + 1,2:$scope.matrizData.distribucionDeEmpresas[i],3:$scope.ruta.NombreDePatio}
        var temp1 = {1:"",3:$scope.ruta.NombreA}
        var temp2 = {1:"",3:$scope.ruta.NombreB}
        var cont = 4
        for (var x = 0; x < $scope.matriz[i].length; x++) {
          if (x == 0) {
            temp0[cont] = $scope.calcularSalidaPatio($scope.matriz[i][x][0][0]);
            temp0[cont + 1] = "";
            // temp0[cont + 1] = $scope.calcularLlegadaAPatio($scope.matriz[i][x][0][1]);
          }else if ((x == $scope.matriz[i].length - 1 &&  $scope.matriz[i][x][0][0] != '')) {
            temp0[cont] = "";
            temp0[cont + 1] = $scope.calcularLlegadaAPatio($scope.matriz[i][x][0][1]);
          } else if ($scope.matriz[i][x + 1]) {
            if ($scope.matriz[i][x + 1][0][0] == '') {
              temp0[cont] = "";
              temp0[cont + 1] = $scope.calcularLlegadaAPatio($scope.matriz[i][x][0][1]);
            }
          } else {
            temp0[cont] = "";
            temp0[cont + 1] = "";
          }
          temp1[cont] = $scope.matriz[i][x][0][0]
          temp1[cont + 1] = $scope.matriz[i][x][0][1]
          temp2[cont] = $scope.matriz[i][x][1][0]
          temp2[cont + 1] = $scope.matriz[i][x][1][1]
          cont += 2;
        }
        data.push(temp0);
        data.push(temp1);
        data.push(temp2);
      }

      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(data, {skipHeader:true});
      ws['!merges'] = [{s:"A4",e:"A5"},{s:"B4",e:"B5"},
                       {s:"C4",e:"C5"},
                       {s:"A1",e:"B1"},{s:"A2",e:"B2"},
                       {s:"D1",e:"E1"},{s:"D2",e:"E2"},
                       {s:"G1",e:"H1"},{s:"G2",e:"H2"},
                       {s:"J1",e:"K1"},{s:"J2",e:"K2"},
                       {s:"M1",e:"N1"},{s:"M2",e:"N2"}];
      ws['!merges'].push({s:"D4", e: alphabeth[($scope.matriz[0].length * 2) + 1] + "4"})
      for (var i = 0; i < merges.length; i++) {
        ws['!merges'].push(merges[i]);
      }
      // console.log(ws['!merges']);
      XLSX.utils.book_append_sheet(wb, ws, "Hoja 1");
      XLSX.writeFile(wb, $scope.ruta.name + " " + $scope.matrizData.fecha + ".xlsx");
    }

    $scope.exportItinerario = function (index) {
      console.log(index);
      console.log($scope.matriz[index]);
      var data = [
        {1:'Codigo:',2:"",3:$scope.matrizData.codigo,4:'Tipo:',5:"",6:$scope.matrizData.tipo,7:'Tipo de ciclo:',8:"",9:$scope.matrizData.tipoDeCiclo,10:'Hora de inicio:',11:"",12:$scope.matrizData.startHour,13:'Intervalo:',14:"",15:$scope.matrizData.intervalo},
        {1:'Fecha:',2:"",3:$scope.matrizData.fecha,4:'Volumen de Diseño:',5:"",6:$scope.matrizData.volumenDeDiseno,7:'Periodo:',8:"",9:$scope.matrizData.periodo,10:'Hora de finalizacion:',11:"",12:$scope.matrizData.endHour,13:'Numero de camiones:',14:"",15:$scope.matrizData.numeroDeCamiones},
        {1:""},
        {1:"Firma de supervisor en ",2:"", 3:"", 4:"",5:$scope.ruta.NombreDePatio,6:"", 7:$scope.ruta.NombreA, 8:"",9:$scope.ruta.NombreB, 10:"", 11:"Firma de supervisor en "},
        {1:$scope.ruta.NombreA ,2:"", 3:"", 4:"",5:"Arribos",6:"Salidas", 7:"Arribos", 8:"Salidas",9:"Arribos", 10:"Salidas", 11:$scope.ruta.NombreB},
      ]

      for (var i = 0; i < $scope.matriz[index].length; i++) {
        if (i == 0) {
          var temp = {1:"",2:"", 3:"", 4:"", 5:"", 6: $scope.calcularSalidaPatio($scope.matriz[index][i][0][0]),
                      7: $scope.matriz[index][i][0][0],8: $scope.matriz[index][i][0][0], 9: $scope.matriz[index][i][1][0], 10:$scope.matriz[index][i][1][1]}
        } else {
          var temp = {1:"",2:"", 3:"", 4:"", 5:"", 6: "",
                      7: $scope.matriz[index][i - 1][0][1],8: $scope.matriz[index][i][0][0], 9: $scope.matriz[index][i][1][0], 10:$scope.matriz[index][i][1][1]}
        }
        data.push(temp)
        var last = i;
      }
      data.push({1:"",2:"", 3:"", 4:"", 5:$scope.calcularLlegadaAPatio($scope.matriz[index][last][0][1])});
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(data, {skipHeader:true});
      ws['!merges'] = [{s:"A1",e:"B1"},{s:"A2",e:"B2"},
                       {s:"D1",e:"E1"},{s:"D2",e:"E2"},
                       {s:"G1",e:"H1"},{s:"G2",e:"H2"},
                       {s:"J1",e:"K1"},{s:"J2",e:"K2"},
                       {s:"A4",e:"D4"},{s:"A5",e:"D5"},
                       {s:"K4",e:"O4"},{s:"K5",e:"O5"},
                       {s:"E4",e:"F4"},{s:"G4",e:"H4"},
                       {s:"I4",e:"J4"},{s:"A3",e:"O3"},
                       {s:"M1",e:"N1"},{s:"M2",e:"N2"},
                      ];
      for (var i = 0; i < ($scope.matriz[index].length + 1); i++) {
        ws['!merges'].push({s:"A" + (i + 6),e:"D" + (i + 6)},{s:"K" + (i + 6),e:"O" + (i + 6)});
      }
      XLSX.utils.book_append_sheet(wb, ws, "Hoja 1");
      XLSX.writeFile(wb, $scope.ruta.name + " " + $scope.matrizData.fecha + " corrida_" + (index + 1) + ".xlsx");
    }

    $scope.exportControlDeSalidas = function (type) {
      var data = [
        {1:'Codigo:',2:"",3:$scope.matrizData.codigo,4:'Tipo:',5:"",6:$scope.matrizData.tipo,7:'Tipo de ciclo:',8:"",9:$scope.matrizData.tipoDeCiclo,10:'Hora de inicio:',11:"",12:$scope.matrizData.startHour,13:'Intervalo:',14:"",15:$scope.matrizData.intervalo},
        {1:'Fecha:',2:"",3:$scope.matrizData.fecha,4:'Volumen de Diseño:',5:"",6:$scope.matrizData.volumenDeDiseno,7:'Periodo:',8:"",9:$scope.matrizData.periodo,10:'Hora de finalizacion:',11:"",12:$scope.matrizData.endHour,13:'Numero de camiones:',14:"",15:$scope.matrizData.numeroDeCamiones},
        {},
        {1:"Autobus",2:"",3:"Empresa",4:"Porcentaje de ocupacion", 5:"", 6:"Horario de Arribo", 7:"Horario de salida", 8:"", 9:"Conductor/Observaciones"},
        {1:"Corrida",	2:"Economico", 3:"", 4:"Arribos",	5:"Salidas", 6:"", 7:"Programada",	8:"Real"}
      ]
      console.log(type);
      console.log($scope.matriz);
      var salidas = [];
      var merges = [];
      if (type == 1) { // Patio
        var nombre = $scope.ruta.NombreDePatio;
        data[2] = {1: "CONTROLES DE SALIDA DE LA RUTA " + $scope.ruta.name + " EN " + $scope.ruta.NombreDePatio};
        for (var x = 0; x < $scope.matriz.length; x++) {
          if ($scope.matriz[x][0][0][0] != "") {
            var temp = {
              salida: $scope.calcularSalidaPatio($scope.matriz[x][0][0][0]),
              llegada:"",
              corrida: x + 1
            }
          }
          salidas.push(temp);
        }
      } else if (type == 2) { // Estacion A
        var nombre = $scope.ruta.NombreA;
        data[2] = {1: "CONTROLES DE SALIDA DE LA RUTA " + $scope.ruta.name + " EN TERMINAL " + $scope.ruta.NombreA};
        for (var i = 0; i < $scope.matriz[0].length; i++) {
          for (var x = 0; x < $scope.matriz.length; x++) {
            if (i == 0) {
              var temp = {
                salida:$scope.matriz[x][i][0][0],
                llegada:$scope.matriz[x][i][0][0],
                corrida: x + 1,
                empresa: $scope.matrizData.distribucionDeEmpresas[x]
              }
            } else {
              if ($scope.matriz[x][i][0][0] != "") {
                var temp = {
                  salida:$scope.matriz[x][i][0][0],
                  llegada:$scope.matriz[x][i - 1][0][1],
                  corrida: x + 1,
                  empresa: $scope.matrizData.distribucionDeEmpresas[x]
                }
              }
            }
            salidas.push(temp);
          }
        }
      } else if (type == 3) { // Estacion B
        var nombre = $scope.ruta.NombreB;
        data[2] = {1: "CONTROLES DE SALIDA DE LA RUTA " + $scope.ruta.name + " EN TERMINAL " + $scope.ruta.NombreB};
        for (var i = 0; i < $scope.matriz[0].length; i++) {
          for (var x = 0; x < $scope.matriz.length; x++) {
            if (i == 0) {
              var temp = {
                salida:$scope.matriz[x][i][1][0],
                llegada:$scope.matriz[x][i][1][0],
                corrida: x + 1,
                empresa: $scope.matrizData.distribucionDeEmpresas[x]
              }
            } else {
              if ($scope.matriz[x][i][1][0] != "") {
                var temp = {
                  salida:$scope.matriz[x][i][1][0],
                  llegada:$scope.matriz[x][i - 1][1][1],
                  corrida: x + 1,
                  empresa: $scope.matrizData.distribucionDeEmpresas[x]
                }
              }
            }
            salidas.push(temp);
          }
        }
      }
      console.log(salidas);
      for (var i = 0; i < salidas.length; i++) {
        data.push({1: salidas[i].corrida,3:salidas[i].empresa,6: salidas[i].llegada,7:salidas[i].salida})
        merges.push({s:"I" + (i + 6),e:"O" + (i + 6)});
      }

      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(data, {skipHeader:true});
      ws['!merges'] = [{s:"A1",e:"B1"},{s:"A2",e:"B2"},
                       {s:"D1",e:"E1"},{s:"D2",e:"E2"},
                       {s:"G1",e:"H1"},{s:"G2",e:"H2"},
                       {s:"J1",e:"K1"},{s:"J2",e:"K2"},
                       {s:"A4",e:"B4"},{s:"C4",e:"C5"},
                       {s:"D4",e:"E4"},{s:"F4",e:"F5"},
                       {s:"G4",e:"H4"},{s:"I4",e:"O5"},
                       {s:"A3",e:"O3"},{s:"M1",e:"N1"},
                       {s:"M2",e:"N2"}];
      for (var i = 0; i < merges.length; i++) {
       ws['!merges'].push(merges[i]);
      }
      XLSX.utils.book_append_sheet(wb, ws, "Hoja 1");
      XLSX.writeFile(wb, $scope.ruta.name + " " + $scope.matrizData.fecha + " Control_De_Salida_" + nombre + ".xlsx");
    }

  })
  .component('timeTable', {
    template: require('./timeTable.html'),
    controller: 'timeTableCtrl'
  })
  .name;
