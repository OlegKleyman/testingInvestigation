var expect = require('chai').expect;
var controller = require('../../api/controllers/employeeController');

describe('employeeController tests', function() {
    var getEmployeeService = seedData => ({
        getAll: () => seedData,
        getById: id => seedData.find(data => data.id == id),
        add: function(employee){
            var maxId = seedData.map(emp => emp.id).reduce((previous, current) => Math.max(current, previous), 1);
            employee.id = maxId + 1;
            seedData.push(employee)

            return employee.id;
        }
    });

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

    const response = {
        json: function (target) {
            return JSON.stringify(target);
        }
    };

    it('getById should return employee when they exist', function(done) {
        var testData = [{name: 'test', id: 1}, {name: 'test2', id: 2}];
        var employeeController = getController(getEmployeeService(testData));

        expect(employeeController.getById({params: {id: 2}}, response)).to.equal(JSON.stringify(testData[1]));

        done();
    });

    it('add should add employee to the datastore', function(done) {
        var testData = [{name: 'test', id: 1}, {name: 'test2', id: 2}];
        var employeeController = getController(getEmployeeService(testData));

        employeeController.add({body: {name: 'test3'}}, response)

        expect(testData.find(employee => employee.id == 3)).to.eql({name: 'test3', id: 3});

        done();
    });

    it('add should return the id of the added employee', function(done) {
        var testData = [{name: 'test', id: 1}, {name: 'test2', id: 2}];
        var employeeController = getController(getEmployeeService(testData));

        expect(employeeController.add({body: {name: 'test3'}}, response)).to.equal('3')

        done();
    });
});