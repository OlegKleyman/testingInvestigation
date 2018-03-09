'use strict';

var expect = require('chai').expect;
var service = require('../../lib/employeeService');

describe('employeeService tests', function() {
    var getDataStore = seedData => ({getAll: () => seedData });

    var getEmployeeService = dataStore => service(dataStore);;

    it('getAll should return employees from the data store', function(done) {
        var testData = [{name: 'test'}, {name: 'test2'}];
        var employeeService = getEmployeeService(getDataStore(testData));

        expect(employeeService.getAll()).to.equal(testData);

        done();
    });

    it('getById should return employee from the data store with the target ID', function(done) {
        var testData = [{name: 'test', id: 1}, {name: 'test2', id: 2}];
        var employeeService = getEmployeeService(getDataStore(testData));

        expect(employeeService.getById(2)).to.equal(testData[1]);

        done();
    });
});