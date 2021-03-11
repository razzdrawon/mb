'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newVehiculo;

describe('Vehiculo API:', function() {
  describe('GET /api/vehiculos', function() {
    var vehiculos;

    beforeEach(function(done) {
      request(app)
        .get('/api/vehiculos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          vehiculos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(vehiculos).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/vehiculos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/vehiculos')
        .send({
          name: 'New Vehiculo',
          info: 'This is the brand new vehiculo!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newVehiculo = res.body;
          done();
        });
    });

    it('should respond with the newly created vehiculo', function() {
      expect(newVehiculo.name).to.equal('New Vehiculo');
      expect(newVehiculo.info).to.equal('This is the brand new vehiculo!!!');
    });
  });

  describe('GET /api/vehiculos/:id', function() {
    var vehiculo;

    beforeEach(function(done) {
      request(app)
        .get(`/api/vehiculos/${newVehiculo._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          vehiculo = res.body;
          done();
        });
    });

    afterEach(function() {
      vehiculo = {};
    });

    it('should respond with the requested vehiculo', function() {
      expect(vehiculo.name).to.equal('New Vehiculo');
      expect(vehiculo.info).to.equal('This is the brand new vehiculo!!!');
    });
  });

  describe('PUT /api/vehiculos/:id', function() {
    var updatedVehiculo;

    beforeEach(function(done) {
      request(app)
        .put(`/api/vehiculos/${newVehiculo._id}`)
        .send({
          name: 'Updated Vehiculo',
          info: 'This is the updated vehiculo!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedVehiculo = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedVehiculo = {};
    });

    it('should respond with the updated vehiculo', function() {
      expect(updatedVehiculo.name).to.equal('Updated Vehiculo');
      expect(updatedVehiculo.info).to.equal('This is the updated vehiculo!!!');
    });

    it('should respond with the updated vehiculo on a subsequent GET', function(done) {
      request(app)
        .get(`/api/vehiculos/${newVehiculo._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let vehiculo = res.body;

          expect(vehiculo.name).to.equal('Updated Vehiculo');
          expect(vehiculo.info).to.equal('This is the updated vehiculo!!!');

          done();
        });
    });
  });

  describe('PATCH /api/vehiculos/:id', function() {
    var patchedVehiculo;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/vehiculos/${newVehiculo._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Vehiculo' },
          { op: 'replace', path: '/info', value: 'This is the patched vehiculo!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedVehiculo = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedVehiculo = {};
    });

    it('should respond with the patched vehiculo', function() {
      expect(patchedVehiculo.name).to.equal('Patched Vehiculo');
      expect(patchedVehiculo.info).to.equal('This is the patched vehiculo!!!');
    });
  });

  describe('DELETE /api/vehiculos/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/vehiculos/${newVehiculo._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when vehiculo does not exist', function(done) {
      request(app)
        .delete(`/api/vehiculos/${newVehiculo._id}`)
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
