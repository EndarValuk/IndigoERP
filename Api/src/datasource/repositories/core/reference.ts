// Loading external dependencies.
import { Provides } from "typescript-ioc";
// Loading local dependencies.
import { ICanReadRepository } from '@indyecm/defs/interfaces';
import { Envelope } from '@indyecm/defs/models';
import { ResultType } from '@indyecm/defs/types';
import { ReferenceQueryModel } from '@indyecm/api/api/models';
import { databaseHandler } from '@indyecm/api/datasource';
import { QueryBuildHandler } from '@indyecm/api/datasource/handlers';

@Provides(ReferenceRepository)
export class ReferenceRepository implements ICanReadRepository<any, string> {
  public async Read(key: ReferenceQueryModel): Promise<Envelope<any>> {
    let result: Envelope<any>;

    try {
      let q = QueryBuildHandler.GetReferenceSelectQuery(key);
      let data = await databaseHandler.query(q).all();
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
