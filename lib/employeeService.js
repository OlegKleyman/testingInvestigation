'use strict';

module.exports = dataStore => (
    { 
        getAll: () => dataStore.getAll(),
        getById: id => dataStore.getSingle(data => data.id == id),
        add: employee => dataStore.add(employee)
    });