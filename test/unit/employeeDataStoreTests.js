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
});