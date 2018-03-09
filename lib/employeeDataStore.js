'use strict';

module.exports = database => (
    { 
        getAll: () => database.getData('/employees'),
        getSingle: filter => database.getData('/employees').find(filter)
    });