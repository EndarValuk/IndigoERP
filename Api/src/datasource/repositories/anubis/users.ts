// Loading external dependencies.
import { Provides } from "typescript-ioc";
// Loading local dependencies.
import { QueryBuildHandler } from '@indy/datasource/handlers';
import { User, ObjectProperty, Envelope } from '@indy/datasource/models';
import { BaseRepository } from '@indy/datasource/repositories';
import { ResultType, ObjectType, ModuleType } from '@indy/types';

@Provides(UsersRepository)
export class UsersRepository extends BaseRepository<User, string> {
  constructor() {
    super(ObjectType.User, ModuleType.Anubis);
  }

  public async Read(key: string): Promise<Envelope<User>> {
    let result: Envelope<User>;

    let predicate = {
      where: { login: key }
    };

    try {
      let user = await User.findOne(predicate);
      if(user) {
        try {
          user.setDataValue("object_properties", await ObjectProperty.all(QueryBuildHandler.GetOrmObjectWhereQuery(user.id, this.ObjectType)));
        }
        catch(e) {
          user.setDataValue("object_properties", []);
        }

        result = new Envelope<User>(ResultType.Success, user);
      }
      else
        result = new Envelope<User>(ResultType.ErrorDatabaseReadNotFound);
    }
    catch(e) {
      result = new Envelope(ResultType.ErrorDatabaseRead, e);
    }
    return result;
  }

  public async ReadAll(): Promise<Envelope<User[]>> {
    let result: Envelope<User[]>;

    try {
      let users = await User.all();
      result = new Envelope<User[]>(ResultType.Success, users);
    }
    catch(e) {
      result = new Envelope<User[]>(ResultType.ErrorDatabaseRead, e);
    }
    return result;
  }

  public async Create(entry: User): Promise<Envelope<User>> {
    let result: Envelope<User>;

    let q = {
      query: this.QueryManager.create_procedure,
      values: [
        JSON.stringify(entry)
      ]
    };

    try {
      let u = await User.sequelize.query(q);
      result = new Envelope<User>(ResultType.Success, u[0][0]);
    }
    catch(e) {
      result = new Envelope<User>(ResultType.ErrorDatabaseCreate, e);
    }
    return result;
  }

  public Update(entry: User): Envelope<User> | Promise<Envelope<User>> {
    return new Envelope<User>(ResultType.NYI);
  }

  public Delete(key: string): Envelope<boolean> | Promise<Envelope<boolean>> {
    return new Envelope<boolean>(ResultType.NYI);
  }
}