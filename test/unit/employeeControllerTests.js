var expect = require('chai').expect;
var controller = require('../../api/controllers/employeeController');
var sinon = require('sinon');

describe('employeeController tests', function() {
    var getEmployeeService = () => ({
        getAll: () => {},
        getById: id => {},
        add: x => {}
    });

    var getController = employeeService => controller(employeeService);;

    it('getAll should return employees when they exist', function(done) {
        var testData = [{name: 'test'}, {name: 'test2'}];
        var service = getEmployeeService();
        sinon.stub(service, 'getAll').returns(testData);
        var employeeController = getController(service);

        expect(employeeController.getAll(null, {json: function(target){
            return JSON.stringify(target)
        }})).to.not.be.empty;

        expect(employeeController.getAll(null, {json: function(target){
            return JSON.stringify(target)
        }})).to.equal(JSON.stringify(testData));

        done();
    });

    var response = function(){
        return {

        json: function (target) {
            return JSON.stringify(target);
        },
        status: function(targetStatus) {
            this.httpStatus = targetStatus
        }
    }};

    it('getById should return employee when they exist', function(done) {
        var testData = {name: 'test2', id: 2};
        var service = getEmployeeService(testData);
        sinon.stub(service, 'getById').withArgs(2).returns(testData);
        var employeeController = getController(service);

        expect(employeeController.getById({params: {id: 2}}, new response())).to.equal(JSON.stringify(testData));

        done();
    });

    it('getById should return 404 status when employee is not found', function(done) {
        var service = getEmployeeService();
        var employeeController = getController(service);

        var res = new response();

        employeeController.getById({params: {id: 2}}, res)

        expect(res.httpStatus).to.equal(404);

        done();
    });

    it('add should add employee to the datastore', function(done) {
        var service = getEmployeeService();
        var stub = sinon.stub(service, 'add');
        var employeeController = getController(service);

        employeeController.add({body: {name: 'test3'}}, new response());

        expect(service.add.calledWithMatch({name: 'test3s'}));

        done();
    });

    it('add should return the id of the added employee', function(done) {
        var service = getEmployeeService();
        var stub = sinon.stub(service, 'add').returns(3);
        var employeeController = getController(service);

        expect(employeeController.add({body: {name: 'test3'}}, new response())).to.equal('3')

        done();
    });
});