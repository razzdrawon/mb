'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './vehiculo.events';

var VehiculoSchema = new mongoose.Schema({
  name: String,
  capacidad: Number
});

registerEvents(VehiculoSchema);
export default mongoose.model('Vehiculo', VehiculoSchema);
