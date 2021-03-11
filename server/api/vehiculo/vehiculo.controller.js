/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/vehiculos              ->  index
 * POST    /api/vehiculos              ->  create
 * GET     /api/vehiculos/:id          ->  show
 * PUT     /api/vehiculos/:id          ->  upsert
 * PATCH   /api/vehiculos/:id          ->  patch
 * DELETE  /api/vehiculos/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Vehiculo from './vehiculo.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Vehiculos
export function index(req, res) {
  return Vehiculo.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Vehiculo from the DB
export function show(req, res) {
  return Vehiculo.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Vehiculo in the DB
export function create(req, res) {
  return Vehiculo.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Vehiculo in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Vehiculo.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Vehiculo in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Vehiculo.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Vehiculo from the DB
export function destroy(req, res) {
  return Vehiculo.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
