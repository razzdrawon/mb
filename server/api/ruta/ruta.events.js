/**
 * Ruta model events
 */

'use strict';

import {EventEmitter} from 'events';
var RutaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RutaEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Ruta) {
  for(var e in events) {
    let event = events[e];
    Ruta.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    RutaEvents.emit(event + ':' + doc._id, doc);
    RutaEvents.emit(event, doc);
  };
}

export {registerEvents};
export default RutaEvents;
