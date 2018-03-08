'use strict';
module.exports = function(app) {
  var employee = require('../controllers/employeeController');

  // employee Routes
  app.route('/tasks')
    .get(employee.getAll)
    .post(employee.create_a_task);


  app.route('/tasks/:taskId')
    .get(employee.read_a_task)
    .put(employee.update_a_task)
    .delete(employee.delete_a_task);
};