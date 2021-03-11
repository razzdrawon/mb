'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newRuta;

describe('Ruta API:', function() {
  describe('GET /api/rutas', function() {
    var rutas;

    beforeEach(function(done) {
      request(app)
        .get('/api/rutas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          rutas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(rutas).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/rutas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/rutas')
        .send({
          name: 'New Ruta',
          info: 'This is the brand new ruta!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newRuta = res.body;
          done();
        });
    });

    it('should respond with the newly created ruta', function() {
      expect(newRuta.name).to.equal('New Ruta');
      expect(newRuta.info).to.equal('This is the brand new ruta!!!');
    });
  });

  describe('GET /api/rutas/:id', function() {
    var ruta;

    beforeEach(function(done) {
      request(app)
        .get(`/api/rutas/${newRuta._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          ruta = res.body;
          done();
        });
    });

    afterEach(function() {
      ruta = {};
    });

    it('should respond with the requested ruta', function() {
      expect(ruta.name).to.equal('New Ruta');
      expect(ruta.info).to.equal('This is the brand new ruta!!!');
    });
  });

  describe('PUT /api/rutas/:id', function() {
    var updatedRuta;

    beforeEach(function(done) {
      request(app)
        .put(`/api/rutas/${newRuta._id}`)
        .send({
          name: 'Updated Ruta',
          info: 'This is the updated ruta!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedRuta = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRuta = {};
    });

    it('should respond with the updated ruta', function() {
      expect(updatedRuta.name).to.equal('Updated Ruta');
      expect(updatedRuta.info).to.equal('This is the updated ruta!!!');
    });

    it('should respond with the updated ruta on a subsequent GET', function(done) {
      request(app)
        .get(`/api/rutas/${newRuta._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let ruta = res.body;

          expect(ruta.name).to.equal('Updated Ruta');
          expect(ruta.info).to.equal('This is the updated ruta!!!');

          done();
        });
    });
  });

  describe('PATCH /api/rutas/:id', function() {
    var patchedRuta;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/rutas/${newRuta._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Ruta' },
          { op: 'replace', path: '/info', value: 'This is the patched ruta!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedRuta = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedRuta = {};
    });

    it('should respond with the patched ruta', function() {
      expect(patchedRuta.name).to.equal('Patched Ruta');
      expect(patchedRuta.info).to.equal('This is the patched ruta!!!');
    });
  });

  describe('DELETE /api/rutas/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/rutas/${newRuta._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when ruta does not exist', function(done) {
      request(app)
        .delete(`/api/rutas/${newRuta._id}`)
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
