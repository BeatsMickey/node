global.api = {};
['mysql2', 'sequelize', 'express', 'axios'].map(function(m) {
    api[m] = require(m);
});