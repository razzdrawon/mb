'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newUnidad;

describe('Unidad API:', function() {
  describe('GET /api/unidades', function() {
    var unidads;

    beforeEach(function(done) {
      request(app)
        .get('/api/unidades')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          unidads = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(unidads).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/unidades', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/unidades')
        .send({
          name: 'New Unidad',
          info: 'This is the brand new unidad!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newUnidad = res.body;
          done();
        });
    });

    it('should respond with the newly created unidad', function() {
      expect(newUnidad.name).to.equal('New Unidad');
      expect(newUnidad.info).to.equal('This is the brand new unidad!!!');
    });
  });

  describe('GET /api/unidades/:id', function() {
    var unidad;

    beforeEach(function(done) {
      request(app)
        .get(`/api/unidades/${newUnidad._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          unidad = res.body;
          done();
        });
    });

    afterEach(function() {
      unidad = {};
    });

    it('should respond with the requested unidad', function() {
      expect(unidad.name).to.equal('New Unidad');
      expect(unidad.info).to.equal('This is the brand new unidad!!!');
    });
  });

  describe('PUT /api/unidades/:id', function() {
    var updatedUnidad;

    beforeEach(function(done) {
      request(app)
        .put(`/api/unidades/${newUnidad._id}`)
        .send({
          name: 'Updated Unidad',
          info: 'This is the updated unidad!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedUnidad = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUnidad = {};
    });

    it('should respond with the updated unidad', function() {
      expect(updatedUnidad.name).to.equal('Updated Unidad');
      expect(updatedUnidad.info).to.equal('This is the updated unidad!!!');
    });

    it('should respond with the updated unidad on a subsequent GET', function(done) {
      request(app)
        .get(`/api/unidades/${newUnidad._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let unidad = res.body;

          expect(unidad.name).to.equal('Updated Unidad');
          expect(unidad.info).to.equal('This is the updated unidad!!!');

          done();
        });
    });
  });

  describe('PATCH /api/unidades/:id', function() {
    var patchedUnidad;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/unidades/${newUnidad._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Unidad' },
          { op: 'replace', path: '/info', value: 'This is the patched unidad!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedUnidad = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedUnidad = {};
    });

    it('should respond with the patched unidad', function() {
      expect(patchedUnidad.name).to.equal('Patched Unidad');
      expect(patchedUnidad.info).to.equal('This is the patched unidad!!!');
    });
  });

  describe('DELETE /api/unidades/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/unidades/${newUnidad._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when unidad does not exist', function(done) {
      request(app)
        .delete(`/api/unidades/${newUnidad._id}`)
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
