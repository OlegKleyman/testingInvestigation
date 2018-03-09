'use strict';

module.exports = database => (
    { 
        getAll: () => database.getData('/employees'),
        getSingle: filter => database.getData('/employees').find(filter),
        add: function(employee){
            var maxId = this.getAll().map(emp => emp.id).reduce((previous, current) => Math.max(current, previous), 0);
            employee.id = maxId + 1;
            database.push('/employees[]', employee, true);
            return employee.id;
        }
    });