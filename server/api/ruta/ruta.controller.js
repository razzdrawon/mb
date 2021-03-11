/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/rutas              ->  index
 * POST    /api/rutas              ->  create
 * GET     /api/rutas/:id          ->  show
 * PUT     /api/rutas/:id          ->  upsert
 * PATCH   /api/rutas/:id          ->  patch
 * DELETE  /api/rutas/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Ruta from './ruta.model';

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

// Gets a list of Rutas
export function index(req, res) {
  if (req.user.role == 'admin') {
    var query = {}
  } else {
    var temp = [];
    for (var i = 0; i < req.user.rutas.length; i++) {
      temp.push(req.user.rutas[i]._id);
    }
    var query = {_id: { $in: temp}}
  }
  return Ruta.find(query).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Ruta from the DB
export function show(req, res) {
  if (req.user.role == 'user') {
    var flag = true;
    for (var i = 0; i < req.user.rutas.length; i++) {
      if (req.user.rutas[i]._id == req.params.id){
        flag = false
      }
    }
    if (flag) {
      res.status(401).end();
      return;
    }
  }

  return Ruta.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Ruta in the DB
export function create(req, res) {
  return Ruta.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Ruta in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Ruta.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Ruta in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Ruta.findByIdAndUpdate(req.params.id,req.body).exec()
    // .then(handleEntityNotFound(res))
    // .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Ruta from the DB
export function destroy(req, res) {
  return Ruta.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function addMatriz(req, res) {
  return Ruta.findById(req.params.id).exec()
    .then(ruta => {
      ruta.matriz.push(req.body);
      ruta.save()
        .then(() =>{
          res.status(200).end();
        })
    })
    .catch(handleError(res));
}
