var expect = require('chai').expect;
var controller = require('../../api/controllers/employeeController');

describe('employeeController tests', function() {
    var getEmployeeService = seedData => ({getAll: () => seedData });

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
});