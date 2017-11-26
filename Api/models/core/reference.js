const orm = require('sequelize');

module.exports = function(db, schema, name) {
  return db.define(name, {
    id: {
      type: orm.INTEGER,
      primaryKey: true
    },
    name: {
      type: orm.STRING(50)
    },
    description: {
      type: orm.STRING(255)
    },
    properties: {
      type: orm.BIGINT,
    },
  },{
    schema: schema,
    tableName: name,
  });
};