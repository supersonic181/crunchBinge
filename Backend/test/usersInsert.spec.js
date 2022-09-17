const should = require('chai').should();
const expect = require('chai').expect;
const userModel = require("../api/modals/users.entity");
const assert = require("assert");


const server = require("../bin/www.js");

const request = require("supertest");

  
let register = {
    userName: "tester008",
    email: "tester008@gmail.com",
    password: "123456789"
}

let user = {
    email: "shubhamshaw222@gmail.com",
    password: "123456"
}

let user2 = {
    email: "shubhamshaw22222@gmail.com",
    userName: "shubhamshaw022@gmail.com",
    password: "ShubhamShaw"
}

let wrongPassword = {
    email: "shubhamshaw022@gmail.com",
    password: "goatees"
}
describe('Registration testing', function()
{
//   //  testcase
    it('Should handle a request to handle multiple registraiton with same email', function(done){
        request(server)
            .post('/api/users/register')
            .expect('Content-Type', /json/)
            .send(user)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.message.should.be.equal('Email already exists', 'Response body should have a key as message which will hold value as username is already exist');
            done();
        });
    });

    it('Should handle a request to handle multiple registraiton with same username', function(done){
        request(server)
            .post('/api/users/register')
            .expect('Content-Type', /json/)
            .send(user2)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.message.should.be.equal('username already taken', 'Response body should have a key as message which will hold value as username is already exist');
            done();
       });
    });

});

describe('Login testing', function()
{
  //  testcase
  it('Should handle a request to successfully login', function(done)
  {
    request(server)
    .post('/api/users/login')
    .expect('Content-Type', /json/)
    .send(user)
    .end(function(err, res) {
      should.not.exist(err);
      expect(res.body.token.length).to.be.above(0, 'Should return a token');
      expect(res.body.token).to.not.equal(null, 'Token should not be null');
      expect(res.body.token).to.not.equal(undefined, 'Token should not be undefined');
      res.body.userName.should.be.equal('Test User 222', 'Response body should have a key as user which will hold userName as a key and it will hold username value');
      done();
    });
  });

  it('Should handle a request to login with wrong password', function(done)
  {
    request(server)
    .post('/api/users/login')
    .expect('Content-Type', /json/)
    .send(wrongPassword)
    .end(function(err, res) {
      should.not.exist(err);
      res.body.message.should.be.equal('Either email or password not match', 'Response body should have a key as message which will hold value as either Password or username is incorrect');
      done();
    });
  });

});