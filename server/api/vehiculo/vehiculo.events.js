/**
 * Vehiculo model events
 */

'use strict';

import {EventEmitter} from 'events';
var VehiculoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
VehiculoEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Vehiculo) {
  for(var e in events) {
    let event = events[e];
    Vehiculo.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    VehiculoEvents.emit(event + ':' + doc._id, doc);
    VehiculoEvents.emit(event, doc);
  };
}

export {registerEvents};
export default VehiculoEvents;
