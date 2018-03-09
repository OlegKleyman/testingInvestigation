'use strict';

module.exports = dataStore => (
    { 
        getAll: () => dataStore.getAll(),
        getById: id => dataStore.getAll().find(data => data.id == id)
    });