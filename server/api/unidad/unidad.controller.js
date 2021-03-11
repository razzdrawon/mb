/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/unidades              ->  index
 * POST    /api/unidades              ->  create
 * GET     /api/unidades/:id          ->  show
 * PUT     /api/unidades/:id          ->  upsert
 * PATCH   /api/unidades/:id          ->  patch
 * DELETE  /api/unidades/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Unidad from './unidad.model';

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

// Gets a list of Unidads
export function index(req, res) {
  return Unidad.find().populate('empresaID').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Unidad from the DB
export function show(req, res) {
  return Unidad.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Unidad in the DB
export function create(req, res) {
  return Unidad.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Unidad in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Unidad.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Unidad in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Unidad.findByIdAndUpdate(req.params.id,req.body).exec()
    // .then(handleEntityNotFound(res))
    // .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Unidad from the DB
export function destroy(req, res) {
  return Unidad.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
