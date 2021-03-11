'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './ruta.events';

var RutaSchema = new mongoose.Schema({
  name: String,
  tiempoDeRecoridoAB: Number,
  tiempoDeRetornoB: Number,
  tiempoDeRecoridoBA: Number,
  tiempoDeRetornoA: Number,
  tiempoDeCiclo: Number,
  tiempoDePatio: Number,
  NombreDePatio: String,
  NombreA: String,
  NombreB: String,
  capacidadDeCamiones: Number,
  tipoDeCamion: String,
  factorDeOcupacion: Number,
  matriz:[{
    fecha: String,
    codigo: String,
    startHour: String,
    endHour: String,
    volumenDeDiseno: Number,
    numeroDeCamiones: Number,
    intervalo: Number,
    tipo: String,
    tipoDeCiclo: String,
    periodo: String,
    festivo: {
      type:Boolean,
      default: true
    },
    distribucionDeEmpresas: [],
    matriz: []
  }]
}, {usePushEach: true});

registerEvents(RutaSchema);
export default mongoose.model('Ruta', RutaSchema);
