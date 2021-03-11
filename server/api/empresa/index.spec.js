'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var empresaCtrlStub = {
  index: 'empresaCtrl.index',
  show: 'empresaCtrl.show',
  create: 'empresaCtrl.create',
  upsert: 'empresaCtrl.upsert',
  patch: 'empresaCtrl.patch',
  destroy: 'empresaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var empresaIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './empresa.controller': empresaCtrlStub
});

describe('Empresa API Router:', function() {
  it('should return an express router instance', function() {
    expect(empresaIndex).to.equal(routerStub);
  });

  describe('GET /api/empresas', function() {
    it('should route to empresa.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'empresaCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/empresas/:id', function() {
    it('should route to empresa.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'empresaCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/empresas', function() {
    it('should route to empresa.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'empresaCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/empresas/:id', function() {
    it('should route to empresa.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'empresaCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/empresas/:id', function() {
    it('should route to empresa.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'empresaCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/empresas/:id', function() {
    it('should route to empresa.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'empresaCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
