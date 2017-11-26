const orm = require('sequelize');

module.exports = function(db) {
  return db.define('users', {
    id: {
      type: orm.BIGINT,
      primaryKey: true
    },
    ref_status: {
      type: orm.INTEGER,
    },
    login: {
      type: orm.STRING(50)
    },
    name: {
      type: orm.STRING(255)
    },
    patronymic: {
      type: orm.STRING(255)
    },
    surname: {
      type: orm.STRING(255)
    },
    properties: {
      type: orm.BIGINT,
    },
    lastchange_timestamp: {
      type: orm.DATE
    },
    create_timestamp: {
      type: orm.DATE
    },
  },{
    schema: 'core',
    tableName: 'users',
  });
};