'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var unidadCtrlStub = {
  index: 'unidadCtrl.index',
  show: 'unidadCtrl.show',
  create: 'unidadCtrl.create',
  upsert: 'unidadCtrl.upsert',
  patch: 'unidadCtrl.patch',
  destroy: 'unidadCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var unidadIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './unidad.controller': unidadCtrlStub
});

describe('Unidad API Router:', function() {
  it('should return an express router instance', function() {
    expect(unidadIndex).to.equal(routerStub);
  });

  describe('GET /api/unidades', function() {
    it('should route to unidad.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'unidadCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/unidades/:id', function() {
    it('should route to unidad.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'unidadCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/unidades', function() {
    it('should route to unidad.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'unidadCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/unidades/:id', function() {
    it('should route to unidad.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'unidadCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/unidades/:id', function() {
    it('should route to unidad.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'unidadCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/unidades/:id', function() {
    it('should route to unidad.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'unidadCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
