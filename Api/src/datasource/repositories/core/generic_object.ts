import { Provides } from 'typescript-ioc';

import { ObjectActionQueryModel, ObjectQueryModel, QueryModel } from '@indigo/api/models';
import { Envelope, ObjectLog } from '@indigo/datasource/models';
import { BaseRepository } from '@indigo/datasource/repositories';
import { ResultType, ObjectType } from '@indigo/types';

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
      let data = await ObjectLog.findAll(this.QueryHelper(entry));
      result = new Envelope<ObjectLog[]>(ResultType.Success, data);
    }
    catch(e) {
      result = new Envelope<ObjectLog[]>(ResultType.ErrorDatabaseCreate, e);
    }
    return result;
  }
}