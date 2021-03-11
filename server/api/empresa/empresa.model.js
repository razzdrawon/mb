'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './empresa.events';

var EmpresaSchema = new mongoose.Schema({
  name: String,
  type: String,
  address: String,
  phone: String,
},{usePushEach: true});

registerEvents(EmpresaSchema);
export default mongoose.model('Empresa', EmpresaSchema);
