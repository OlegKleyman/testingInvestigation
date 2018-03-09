'use strict';
module.exports = function(app) {
  var employee = require('../controllers/employeeController')({getAll: function(){return {getAll: []}}});

  // employee Routes
  app.route('/employees')
    .get(employee.getAll);
};