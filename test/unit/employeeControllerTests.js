var expect = require('chai').expect;
var controller = require('../../api/controllers/employeeController');

describe('employeeController tests', function() {
    var getEmployeeService = seedData => ({getAll: () => seedData, getById: id => seedData.find(data => data.id == id) });

    var getController = employeeService => controller(employeeService);;

    it('getAll should return employees when they exist', function(done) {
        var testData = [{name: 'test'}, {name: 'test2'}];
        var employeeController = getController(getEmployeeService(testData));

        expect(employeeController.getAll(null, {json: function(target){
            return JSON.stringify(target)
        }})).to.not.be.empty;

        expect(employeeController.getAll(null, {json: function(target){
            return JSON.stringify(target)
        }})).to.equal(JSON.stringify(testData));

        done();
    });

    it('getById should return employee when they exist', function(done) {
        var testData = [{name: 'test', id: 1}, {name: 'test2', id: 2}];
        var employeeController = getController(getEmployeeService(testData));

        expect(employeeController.getById({params: {id: 2}}, {json: function(target){
            return JSON.stringify(target)
        }})).to.equal(JSON.stringify(testData[1]));

        done();
    });
});