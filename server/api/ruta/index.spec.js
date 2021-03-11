'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var rutaCtrlStub = {
  index: 'rutaCtrl.index',
  show: 'rutaCtrl.show',
  create: 'rutaCtrl.create',
  upsert: 'rutaCtrl.upsert',
  patch: 'rutaCtrl.patch',
  destroy: 'rutaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var rutaIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './ruta.controller': rutaCtrlStub
});

describe('Ruta API Router:', function() {
  it('should return an express router instance', function() {
    expect(rutaIndex).to.equal(routerStub);
  });

  describe('GET /api/rutas', function() {
    it('should route to ruta.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'rutaCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/rutas/:id', function() {
    it('should route to ruta.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'rutaCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/rutas', function() {
    it('should route to ruta.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'rutaCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/rutas/:id', function() {
    it('should route to ruta.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'rutaCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/rutas/:id', function() {
    it('should route to ruta.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'rutaCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/rutas/:id', function() {
    it('should route to ruta.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'rutaCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
