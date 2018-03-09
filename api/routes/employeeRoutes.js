'use strict';
var jsonDB = require('node-json-db');

module.exports = function(app) {
  var database = new jsonDB(app.configuration.databaseConnectionString, true, true);
  var employeeDataStore = require('../../lib/employeeDataStore')(database);
  var employeeService = require('../../lib/employeeService')(employeeDataStore);
  var employee = require('../controllers/employeeController')(employeeService);

  // employee Routes
  app.route('/employees')
    .get(employee.getAll);

  app.route('/employees/:id')
    .get(employee.getById);
};