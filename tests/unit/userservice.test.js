import database from '../../src/config/database';
import {expect } from 'chai';
import * as UserService from '../../src/services/user.service'

describe('Test User Service', () => {
  before(async () => {
    await database();
  });
  after((done) => {
    done();
  })
  
  describe('test create new user', () => {
    it('for given body it should throw error user already exist', async (done) => {
      const mockData = {
        fullName: "Shivangi Ranjan",
        userName: "shiviRRRRanjan",
        email: "shivangiRRRR@gmail.com",
        password: "shivangiRRR"
      };
      expect(() => UserService.newUser(mockData).to.throw('User Already Exist'));
      done();
    });
    it('for given body it should acknowledge the inserted data', async () => {
      const mockData = {
        fullName: "Shivangi Verma",
        userName: "shiviVerma",
        email: "shivangi.verma@yopmail.com",
        password: "shivangiV"
      };
      const data = await UserService.newUser(mockData);
            expect(data.acknowledged).to.be.true;      
    });
  });
  describe('test login user', () => {
    it('for given body it should throw error user dont exist', async (done) => {
      const mockData = {       
        email: "shivangiRRRR1238970@yopmail.com",
        password: "shivangiRRR"
      };
      expect(() => UserService.login(mockData).to.throw('User Already Exist'));
      done();
    });

    it('for given body it should throw error invalid password', async (done) => {
      const mockData = {       
        email: "shivangiRRRR1238970@yopmail.com",
        password: "shivangiRRRTy"
      };
      expect(() => UserService.login(mockData).to.throw("Not a Valid Password"));
      done();
    });
    it('for given body it should login the user successfully', async () => {
      const mockData = {       
        email: "shivangi.verma@yopmail.com",
        password: "shivangiV"
      };
      const data = await UserService.login(mockData);
      expect(data.data.email).to.be.equals(mockData.email);      
    });    
  });
});