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
				expect(res.body).to.eql(db.getData('/employees'))
				done(); 
			}); 
		});
	});

	describe('GET employee', function() { 
		var result;
		
		it('Given I am a user', function(done){
			done();
		});
		
		it('And I want to view an employee', function(done){			
			db.push("/employees", [{name: 'Oleg', id: 1, governmentId: '123abc'}, 
								{name: 'Lindsay', id: 2, governmentId: '456def'}],
								true);

			done();
		});
		
		it('When I make an API GET request on /employees/2', function(done){
			result = request(app).get('/employees/2');
			done();
		});
			
		it('Then I should get back an employee with the ID of 2', function(done){
			result.end(function(err, res) { 
				expect(res.body).to.eql(db.getData('/employees')[1])
				done(); 
			}); 
		});
	});

	describe('add employee', function() { 
		var result;
		
		it('Given I am a user', function(done){
			done();
		});
		
		it('And I want to add an employee', function(done){
			db.push("/employees", [{name: 'Oleg', id: 1, governmentId: '123abc'}, 
								{name: 'Lindsay', id: 2, governmentId: '456def'}],
								true);
			
			done();
		});
		
		it('When I make an API POST request on /employees', function(done){
			result = request(app).post('/employees').send({name: 'Walter', id: 3, governmentId: '1a1a1a1a'});

			done();
		});
			
		it('Then I should get back the added employee', function(done){
			result.end(function(err, res) { 
				// database needs to be reloaded to clear its cache
				db.reload();
				expect(db.getData('/employees')).that.deep.includes({name: 'Walter', id: 3, governmentId: '1a1a1a1a'});

				done();
			}); 
		});
	});
});