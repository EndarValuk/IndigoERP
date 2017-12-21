import { Provides } from "typescript-ioc";

import { ObjectActionQueryModel, ObjectQueryModel } from '@indigo/api/models';
import { Envelope, ObjectLog } from '@indigo/datasource/models';
import Queries from '@indigo/datasource/queries';
import { ResultType } from '@indigo/types';

@Provides(GenericObjectRepository)
class GenericObjectRepository {
  public async ExecuteAction(entry: ObjectActionQueryModel): Promise<Envelope<any>> {
    let result: Envelope<any>;

    try {
      let q = {
        query: Queries.objects.execute_action_procedure,
        values: [
          entry.Ref_Object,
          entry.Ref_ObjectType,
          entry.Ref_Action,
          entry.Ref_Invoker,
          entry.Remark
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

  public async GetLogs(entry: ObjectQueryModel) : Promise<Envelope<any>> {
    let result: Envelope<any>;

    try {
      let data = await ObjectLog.all();
      result = new Envelope(ResultType.Success, data);
    }
    catch(e) {
      result = new Envelope(ResultType.ErrorDatabaseCreate, e);
    }
    return result;
  }
}

export { GenericObjectRepository };