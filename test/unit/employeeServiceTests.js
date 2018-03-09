'use strict';

var expect = require('chai').expect;
var service = require('../../lib/employeeService');

describe('employeeService tests', function() {
    var getDataStore = seedData => ({getAllEmployees: () => seedData });

    var getEmployeeService = dataStore => service(dataStore);;

    it('getAll should return employees from the data store', function(done) {
        var testData = [{name: 'test'}, {name: 'test2'}];
        var employeeService = getEmployeeService(getDataStore(testData));

        expect(employeeService.getAll()).to.equal(testData);

        done();
    });
});