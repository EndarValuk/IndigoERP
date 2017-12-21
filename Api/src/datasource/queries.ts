// Loading configuration.
const config = require('@indigo/config.json');
const queries = require('@indigo/queries.json');

class Manager {
  public static get Query():any {
    return queries[config.database.type];
  }
}

export default Manager.Query;