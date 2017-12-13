import { Provides } from "typescript-ioc";

import { ReferenceQueryModel } from "@indigo/api/models";
import { ICanReadRepository } from '@indigo/datasource/repositories/interfaces';
import { Envelope, Reference } from '@indigo/datasource/models';
import { ResultType } from '@indigo/types';

@Provides(ReferenceRepository)
class ReferenceRepository implements ICanReadRepository<any, string> {
  public async Read(key: ReferenceQueryModel): Promise<Envelope<any>> {
    let result: Envelope<any>;

    try {
      let table = `${key.Type}`;

      if(key.Levels) {
        key.Levels.forEach(element => {
          table += `_${element}`;
        });
      }
      let q = `SELECT * FROM "${key.Project}"."${table}"`;
      let data = await Reference.sequelize.query(q).all();
      result = new Envelope(ResultType.Success, data[0]);
    }
    catch(e) {
      result = new Envelope(ResultType.ErrorDatabaseRead, e);
    }
    return result;
  }

  public ReadAll(key: ReferenceQueryModel): Promise<Envelope<any[]>> {
    return this.Read(key);
  }
}

export { ReferenceRepository };