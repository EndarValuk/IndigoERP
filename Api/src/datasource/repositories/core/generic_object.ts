// Loading external dependencies.
import { Provides } from 'typescript-ioc';
// Loading local dependencies.
import { ObjectActionQueryModel, ObjectQueryModel, QueryModel } from '@indy/api/models';
import { QueryBuildHandler } from '@indy/datasource/handlers';
import { Envelope, ObjectLog } from '@indy/datasource/models';
import { BaseRepository } from '@indy/datasource/repositories';
import { ResultType, ObjectType } from '@indy/types';

@Provides(GenericObjectRepository)
export class GenericObjectRepository extends BaseRepository<any, any> {
  constructor() {
    super(ObjectType.Generic);
  }

  public async ExecuteAction(entry: ObjectActionQueryModel): Promise<Envelope<any>> {
    let result: Envelope<any>;

    try {
      let q = {
        query: this.QueryManager.execute_action_procedure,
        values: [
          JSON.stringify(entry)
        ]
      };
      await ObjectLog.sequelize.query(q).any();
      result = new Envelope(ResultType.Success, true);
    }
    catch(e) {
      result = new Envelope(ResultType.ErrorDatabaseCreate, e);
    }
    return result;
  }

  public async GetLogs(entry?: ObjectQueryModel | QueryModel) : Promise<Envelope<ObjectLog[]>> {
    let result: Envelope<ObjectLog[]>;

    try {
      let q = QueryBuildHandler.GetOrmQuery(entry);
      let data = await ObjectLog.findAll(q);
      result = new Envelope<ObjectLog[]>(ResultType.Success, data);
    }
    catch(e) {
      result = new Envelope<ObjectLog[]>(ResultType.ErrorDatabaseCreate, e);
    }
    return result;
  }
}