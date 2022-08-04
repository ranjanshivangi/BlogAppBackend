import database from '../../src/config/database';
import { expect } from 'chai';
import request from 'supertest';
import HttpStatus from 'http-status-codes';
import app from '../../src/index';

let authToken;

describe('Test URL', () => {
  before(async () => {
    await database()
  });

  describe('POST /register', () => {
    it('given new user when added should return status 201', (done) => {
      const userdetails = {
        fullName: "Shivangi Ranjan",
        userName: "shiviRRRRanjan",
        email: "shivangiRRRR@gmail.com",
        password: "shivangiRRR"
      };
      request(app)
        .post('/api/v1/users/register')
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
    it('give message user already exist and should return status 409', (done) => {
      const userdetails = {

        userName: "ugiukgwSRanjan",
        email: "shivangiRRRR@gmail.com",
        password: "shivangiDE"
      };
      request(app)
        .post('/api/v1/users/register')
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CONFLICT);
          done();
        });
    });

  });
  describe('POST /login', () => {

    it('login registered user when added should return status 200', (done) => {
      const userdetails = {
        email: "shivangiRRRR@gmail.com",
        password: "shivangiRRR"
      };
      request(app)
        .post('/api/v1/users/login')
        .send(userdetails)
        .end((err, res) => {
          authToken = res.body.data;
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });

    });

    it('give message usser doess not exist and return status 409', (done) => {
      const userdetails = {
        email: "shiva@gmail.com",
        password: "shivangiRRR"
      };
      request(app)
        .post('/api/v1/users/login')
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CONFLICT);
          done();
        });

    });

    it('give message invalid password and return status 409', (done) => {
      const userdetails = {
        email: "shivangiRRRR@gmail.com",
        password: "shiva"
      };
      request(app)
        .post('/api/v1/users/login')
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CONFLICT);
          done();
        });
    });
  });
});
