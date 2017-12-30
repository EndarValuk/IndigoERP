// Loading external dependencies.
import { Provides } from "typescript-ioc";
// Loading local dependencies.
import { ReferenceQueryModel } from '@indy/api/models';
import { databaseHandler } from '@indy/datasource';
import { QueryBuildHandler } from '@indy/datasource/handlers';
import { Envelope } from '@indy/datasource/models';
import { ICanReadRepository } from '@indy/datasource/repositories/interfaces';
import { ResultType } from '@indy/types';

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