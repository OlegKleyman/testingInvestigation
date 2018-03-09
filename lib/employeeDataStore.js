'use strict';

module.exports = database => ({ getAll: () => database.getData('/employees') });