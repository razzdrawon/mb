'use strict';

var express = require('express');
var controller = require('./ruta.controller');

var router = express.Router();
import * as auth from '../../auth/auth.service';

router.get('/',auth.isAuthenticated(), controller.index);
router.get('/:id',auth.isAuthenticated(), controller.show);
router.post('/',auth.hasRole('admin'), controller.create);
router.post('/addMatriz/:id',auth.hasRole('admin'), controller.addMatriz);
router.put('/:id',auth.hasRole('admin'), controller.upsert);
router.patch('/:id',auth.hasRole('admin'), controller.patch);
router.delete('/:id',auth.hasRole('admin'), controller.destroy);

module.exports = router;
