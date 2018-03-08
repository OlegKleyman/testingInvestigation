'use strict';
module.exports = function(app) {
  var employee = require('../controllers/employeeController');

  // employee Routes
  app.route('/employees')
    .get(employee.getAll);
};