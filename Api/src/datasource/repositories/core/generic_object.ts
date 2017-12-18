import { Provides } from "typescript-ioc";

import { ObjectActionQueryModel } from '@indigo/api/models';
import { Envelope, ObjectLog } from '@indigo/datasource/models';
import { ResultType } from '@indigo/types';

@Provides(GenericObjectRepository)
class GenericObjectRepository {
  public async ExecuteAction(entry: ObjectActionQueryModel): Promise<Envelope<any>> {
    let result: Envelope<any>;

    try {
      let q = {
        query: `SELECT * FROM "core"."execute_object_action"(?,?,?,?,?)`,
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
}

export { GenericObjectRepository };