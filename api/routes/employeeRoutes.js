'use strict';
var jsonDB = require('node-json-db');

module.exports = function(app) {
  console.log('222222222222222222');
  console.log(app.configuration.databaseConnectionString);
  var database = new jsonDB(app.configuration.databaseConnectionString, true, true);
  var employeeDataStore = require('../../lib/employeeDataStore')(database);
  var employeeService = require('../../lib/employeeService')(employeeDataStore);
  var employee = require('../controllers/employeeController')(employeeService);

  // employee Routes
  app.route('/employees')
    .get(employee.getAll);
};