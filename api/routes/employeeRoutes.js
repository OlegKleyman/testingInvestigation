'use strict';
module.exports = function(app) {
  var employeeService = require('../../lib/employeeService')({getEmployeeService: function(){return []}});
  var employee = require('../controllers/employeeController')(employeeService);

  // employee Routes
  app.route('/employees')
    .get(employee.getAll);
};