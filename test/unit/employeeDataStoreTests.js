'use strict';

var expect = require('chai').expect;
var dataStore = require('../../lib/employeeDataStore');

describe('employeeDataStore tests', function() {
    var getDatabase = seedData => ({getData: (target) => seedData });

    var getEmployeeDataStore = database => dataStore(database);;

    it('getAll should return employees from the underline data store', function(done) {
        var testData = [{name: 'test'}, {name: 'test2'}];
        var employeeService = getEmployeeDataStore(getDatabase(testData));

        expect(employeeService.getAll()).to.equal(testData);

        done();
    });

    it('getSingle should return employee from the underline data store by filter argument', function(done) {
        var testData = [{name: 'test'}, {name: 'test2'}];
        var employeeService = getEmployeeDataStore(getDatabase(testData));

        expect(employeeService.getSingle(data => data.name == 'test2')).to.equal(testData[1]);

        done();
    });
});