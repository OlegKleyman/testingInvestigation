'use strict';

var app = require('../../server'),
  request = require('supertest'),
	expect = require('chai').expect;

var jsonDB = require('node-json-db');
var db = new jsonDB("testdata", true, true);

after(function () {
	console.log('stopping');
  
	app.server.close();
	console.log('stopped');
});
	
describe('As an HR user I want to be able to manage employees', function() {
  describe('GET employees', function() { 
		var result;
		
		it('Given I am a user', function(done){
			done();
		});
		
		it('And I want to view all employees', function(done){			
			db.push("/employees", [{name: 'Oleg', id: 1, governmentId: '123abc'}, 
														 {name: 'Lindsay', id: 2, governmentId: '456def'}],
														 true);

			done();
		});
		
		it('When I make an API GET request on /employees', function(done){
			result = request(app).get('/employees');
			done();
		});
			
		it('Then I should get back all employees', function(done){
			result.end(function(err, res) { 

				expect(res.body.employees.length).to.equal(db.getData('/employees').length)
				done(); 
			}); 
		});
  });
});