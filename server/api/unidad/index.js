'use strict';

var express = require('express');
var controller = require('./unidad.controller');

var router = express.Router();
import * as auth from '../../auth/auth.service';

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/',auth.hasRole('admin'), controller.create);
router.put('/:id',auth.hasRole('admin'), controller.upsert);
router.patch('/:id',auth.hasRole('admin'), controller.patch);
router.delete('/:id',auth.hasRole('admin'), controller.destroy);

module.exports = router;
