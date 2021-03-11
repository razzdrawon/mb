'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './unidad.events';

var UnidadSchema = new mongoose.Schema({
  modelo: String,
  marca: String,
  matricula: String,
  tarjetaDeCirculacion: String,
  polizaDeSeguro: String,
  companiaDeSeguro: String,
  tipoDeVehiculo: String,
  capacidad: Number,
  empresaID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empresa',
  },
},{usePushEach: true});

registerEvents(UnidadSchema);
export default mongoose.model('Unidad', UnidadSchema);
