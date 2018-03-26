'use strict';

var expect = require('chai').expect;
var service = require('../../lib/employeeService');
var sinon = require('sinon');

describe('employeeService tests', function() {
    var getDataStore = () => (
        {
            getAll: () => {},
            getSingle: filter => {},
            add: employee => {}
        });

    var getEmployeeService = dataStore => service(dataStore);;

    it('getAll should return employees from the data store', function(done) {
        var testData = [{name: 'test'}, {name: 'test2'}];
        var store = getDataStore();
        sinon.stub(store, 'getAll').returns(testData);
        var employeeService = getEmployeeService(store);

        expect(employeeService.getAll()).to.equal(testData);

        done();
    });

    it('getById should return employee from the data store with the target ID', function(done) {
        var testData = {name: 'test2', id: 2};
        var store = getDataStore();
        sinon.stub(store, 'getSingle').withArgs(2).returns(testData);
        var employeeService = getEmployeeService(store);

        expect(employeeService.getById(2)).to.equal(testData[1]);

        done();
    });

    it('add should return the ID of added employee', function(done) {
        var store = getDataStore();
        sinon.stub(store, 'add').withArgs({name: 'test3'}).returns(3);
        var employeeService = getEmployeeService(store);

        expect(employeeService.add({name: 'test3'})).to.equal(3);

        done();
    });
});