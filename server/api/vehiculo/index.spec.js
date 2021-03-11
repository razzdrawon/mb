'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var vehiculoCtrlStub = {
  index: 'vehiculoCtrl.index',
  show: 'vehiculoCtrl.show',
  create: 'vehiculoCtrl.create',
  upsert: 'vehiculoCtrl.upsert',
  patch: 'vehiculoCtrl.patch',
  destroy: 'vehiculoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var vehiculoIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './vehiculo.controller': vehiculoCtrlStub
});

describe('Vehiculo API Router:', function() {
  it('should return an express router instance', function() {
    expect(vehiculoIndex).to.equal(routerStub);
  });

  describe('GET /api/vehiculos', function() {
    it('should route to vehiculo.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'vehiculoCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/vehiculos/:id', function() {
    it('should route to vehiculo.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'vehiculoCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/vehiculos', function() {
    it('should route to vehiculo.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'vehiculoCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/vehiculos/:id', function() {
    it('should route to vehiculo.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'vehiculoCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/vehiculos/:id', function() {
    it('should route to vehiculo.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'vehiculoCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/vehiculos/:id', function() {
    it('should route to vehiculo.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'vehiculoCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
