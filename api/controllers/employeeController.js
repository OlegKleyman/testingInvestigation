'use strict';

module.exports = function(employeeService){
  return {
    getAll: function(req, res) {
      return res.json(employeeService.getAll());
    },
    getById: function(req, res) {
      const employee = employeeService.getById(req.params.id);
      return res.json(employee);
    },
    add: function(req, res){
      var id = employeeService.add(req.body);

      return res.json(id);
    }
  }
}