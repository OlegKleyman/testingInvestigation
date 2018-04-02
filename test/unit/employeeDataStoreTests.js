'use strict';

var expect = require('chai').expect;
var dataStore = require('../../lib/employeeDataStore');
var sinon = require('sinon');

describe('employeeDataStore tests', function() {
    var getDatabase = () => ({
        getData: target => {},
        push: (path, target, overwrite) => {}
    });

    var getEmployeeDataStore = database => dataStore(database);;

    it('getAll should return employees from the underline data store', function(done) {
        var testData = [{name: 'test'}, {name: 'test2'}];
        var database = getDatabase();
        sinon.stub(database, 'getData').withArgs('/employees').returns(testData);
        var dataStore = getEmployeeDataStore(database);

        expect(dataStore.getAll()).to.equal(testData);

        done();
    });

    it('getSingle should return employee from the underline data store by filter argument', function(done) {
        var testData = [{name: 'test'}, {name: 'test2'}];
        var database = getDatabase();
        sinon.stub(database, 'getData').withArgs('/employees').returns(testData);
        var dataStore = getEmployeeDataStore(database);

        expect(dataStore.getSingle(data => data.name == 'test2')).to.equal(testData[1]);

        done();
    });

    it('add should return the ID of the added employee from the underline data store', function(done) {
        var testData = [{name: 'test', id: 1}, {name: 'test2', id: 2}];
        var database = getDatabase();
        sinon.stub(database, 'getData').withArgs('/employees').returns(testData);
        var dataStore = getEmployeeDataStore(database);

        expect(dataStore.add({name: 'test3'})).to.equal(3);

        done();
    });

    it('add should add employee to the underline data store', function(done) {
        var database = getDatabase();
        sinon.stub(database, 'getData').returns([]);
        sinon.stub(database, 'push');
        var dataStore = getEmployeeDataStore(database);

        dataStore.add({name: 'test3'});

        expect(database.push.calledWithMatch({name: 'test3'}));

        done();
    });

    it('add should add employee to the underline data store with an ID if no IDs exist', function(done) {
        var database = getDatabase();
        sinon.stub(database, 'getData').returns([]);
        sinon.stub(database, 'push');
        var dataStore = getEmployeeDataStore(database);

        dataStore.add({name: 'test3'});
        expect(database.push.calledWithMatch({name: 'test3'}));

        done();
    });
});