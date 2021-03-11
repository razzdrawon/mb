'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newEmpresa;

describe('Empresa API:', function() {
  describe('GET /api/empresas', function() {
    var empresas;

    beforeEach(function(done) {
      request(app)
        .get('/api/empresas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          empresas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(empresas).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/empresas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/empresas')
        .send({
          name: 'New Empresa',
          info: 'This is the brand new empresa!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newEmpresa = res.body;
          done();
        });
    });

    it('should respond with the newly created empresa', function() {
      expect(newEmpresa.name).to.equal('New Empresa');
      expect(newEmpresa.info).to.equal('This is the brand new empresa!!!');
    });
  });

  describe('GET /api/empresas/:id', function() {
    var empresa;

    beforeEach(function(done) {
      request(app)
        .get(`/api/empresas/${newEmpresa._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          empresa = res.body;
          done();
        });
    });

    afterEach(function() {
      empresa = {};
    });

    it('should respond with the requested empresa', function() {
      expect(empresa.name).to.equal('New Empresa');
      expect(empresa.info).to.equal('This is the brand new empresa!!!');
    });
  });

  describe('PUT /api/empresas/:id', function() {
    var updatedEmpresa;

    beforeEach(function(done) {
      request(app)
        .put(`/api/empresas/${newEmpresa._id}`)
        .send({
          name: 'Updated Empresa',
          info: 'This is the updated empresa!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedEmpresa = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEmpresa = {};
    });

    it('should respond with the updated empresa', function() {
      expect(updatedEmpresa.name).to.equal('Updated Empresa');
      expect(updatedEmpresa.info).to.equal('This is the updated empresa!!!');
    });

    it('should respond with the updated empresa on a subsequent GET', function(done) {
      request(app)
        .get(`/api/empresas/${newEmpresa._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let empresa = res.body;

          expect(empresa.name).to.equal('Updated Empresa');
          expect(empresa.info).to.equal('This is the updated empresa!!!');

          done();
        });
    });
  });

  describe('PATCH /api/empresas/:id', function() {
    var patchedEmpresa;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/empresas/${newEmpresa._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Empresa' },
          { op: 'replace', path: '/info', value: 'This is the patched empresa!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedEmpresa = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedEmpresa = {};
    });

    it('should respond with the patched empresa', function() {
      expect(patchedEmpresa.name).to.equal('Patched Empresa');
      expect(patchedEmpresa.info).to.equal('This is the patched empresa!!!');
    });
  });

  describe('DELETE /api/empresas/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/empresas/${newEmpresa._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when empresa does not exist', function(done) {
      request(app)
        .delete(`/api/empresas/${newEmpresa._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
