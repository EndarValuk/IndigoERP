let app = new (require('express').Router)();

const referenceRoutes = require('./core/reference');
const userRoutes = require('./core/users');

module.exports = function(app, db) {
  referenceRoutes(app, db);
  userRoutes(app, db);
};