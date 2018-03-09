'use strict';

var expect = require('chai').expect;
var dataStore = require('../../lib/employeeDataStore');

describe('employeeDataStore tests', function() {
    var getDatabase = seedData => ({
            getData: (target) => seedData,
            push: (path, target, overwrite) => seedData.push(target)
        });

    var getEmployeeDataStore = database => dataStore(database);;

    it('getAll should return employees from the underline data store', function(done) {
        var testData = [{name: 'test'}, {name: 'test2'}];
        var dataStore = getEmployeeDataStore(getDatabase(testData));

        expect(dataStore.getAll()).to.equal(testData);

        done();
    });

    it('getSingle should return employee from the underline data store by filter argument', function(done) {
        var testData = [{name: 'test'}, {name: 'test2'}];
        var dataStore = getEmployeeDataStore(getDatabase(testData));

        expect(dataStore.getSingle(data => data.name == 'test2')).to.equal(testData[1]);

        done();
    });

    it('add should return the ID of the added employee from the underline data store', function(done) {
        var testData = [{name: 'test', id: 1}, {name: 'test2', id: 2}];
        var dataStore = getEmployeeDataStore(getDatabase(testData));

        expect(dataStore.add({name: 'test3'})).to.equal(3);

        done();
    });

    it('add should add employee to the underline data store', function(done) {
        var testData = [{name: 'test', id: 1}, {name: 'test2', id: 2}];
        var dataStore = getEmployeeDataStore(getDatabase(testData));

        dataStore.add({name: 'test3'});

        expect(testData.find(employee => employee.id == 3)).to.eql({name: 'test3', id: 3});

        done();
    });

    it('add should add employee to the underline data store with an ID if no IDs exist', function(done) {
        var testData = [];
        var dataStore = getEmployeeDataStore(getDatabase(testData));

        dataStore.add({name: 'test3'});
        expect(testData.find(employee => employee.id == 1)).to.eql({name: 'test3', id: 1});

        done();
    });
});