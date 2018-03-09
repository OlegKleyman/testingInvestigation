'use strict';

module.exports = function(employeeService){
  return {
    getAll: function(req, res) {
      return res.json(employeeService.getAll());
    }
  }
}