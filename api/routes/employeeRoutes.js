'use strict';
module.exports = function(app) {
  var employeeDataStore = require('../../lib/employeeDataStore')({getData: function(target){return []}});
  var employeeService = require('../../lib/employeeService')(employeeDataStore);
  var employee = require('../controllers/employeeController')(employeeService);

  // employee Routes
  app.route('/employees')
    .get(employee.getAll);
};