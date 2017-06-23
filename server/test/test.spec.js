var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');
var index = require('../index');
var moviecontrol = require('../controller/moviecontroller'); 
var authencontrol = require('../controller/authentication');
var movie = require('../models/movieschema');
var authen = require('../models/authenschema');
var url = request("http://localhost:3000");

var moviestub = sinon.stub(movie,'find');
var authenstub = sinon.stub(authen,'find');

//test case to find the movie in favourite list
describe('Find the movie in favourite list',function(err){
       beforeEach(function(){
        moviestub.yields(null,[{'Title':'Ko'}]);
    });
       it('Matches the find movies',function(done){
           url       
           .get('/movie/view')  
           .expect(200)     
           .expect('Content-Type', /json/)  
           .end(function(err, res){
               if (err) return done(err);     
               //Enter your assertions here  
               expect(res.body[2].Title).to.be.equal("Ko"); 
               done();
    });
  }); 
});

//test case to find the user in database
/*describe('Finds the user in Database ',function(err){
       beforeEach(function(){
        authenstub.yields(null,[{'UserName':'vino@gmail.com'}]);
    });
       it('Matches the User',function(done){
           url       
           .get('/signup')  
           .expect(200)     
           .expect('Content-Type', /json/)  
           .end(function(err, res){
               if (err) return done(err);     
               //Enter your assertions here  
               expect(res.body[0].UserName).to.be.equal("vino@gmail.com"); 
               done();
    });
  }); 
});

//test case to find the user in database
describe('Finds the user in Database ',function(err){
       beforeEach(function(){
        authenstub.withArgs({UserName:'vino@gmail.com'}).returns({"FirstName":"vino","LastName":"cr"});
    });
       it('Matches the User',function(done){
           url       
           .get('/signup')  
           .expect(200)       
           .end(function(err, res){
               if (err) return done(err);     
               //Enter your assertions here  
               expect(authenstub({UserName:'vino@gmail.com'}).FirstName).to.be.equal("vino"); 
               done();
    });
  }); 
});*/