// Loading external dependencies.
import { Provides } from 'typescript-ioc';

// Loading local dependencies.
import { Envelope, QueryModel } from '@indyecm/defs/models';
import { ModuleType, ObjectType, ResultType } from '@indyecm/defs/types';

import { QueryBuildHandler } from '@indyecm/api/datasource/handlers';
import { ObjectProperty, User } from '@indyecm/api/datasource/models';
import { BaseRepository } from '@indyecm/api/datasource/repositories';

@Provides(UsersRepository)
export class UsersRepository extends BaseRepository<User, string> {
  public constructor() {
    super(ObjectType.User, ModuleType.Anubis);
  }

  public async Read(key: string): Promise<Envelope<User>> {
    let result: Envelope<User>;

    let predicate = {
      where: { login: key },
    };

    try {
      let user = await User.findOne(predicate);
      if(user) {
        try {
          user.setDataValue('object_properties', await ObjectProperty.all(QueryBuildHandler.GetOrmObjectWhereQuery(user.id, this.ObjectType)));
        }
        catch(e) {
          user.setDataValue('object_properties', []);
        }

        result = new Envelope<User>(ResultType.Success, user);
      }
      else {
        result = new Envelope<User>(ResultType.ErrorDatabaseReadNotFound);
      }
    }
    catch(e) {
      result = new Envelope(ResultType.ErrorDatabaseRead, e);
    }
    return result;
  }

  public async ReadAll(key?: QueryModel): Promise<Envelope<User[]>> {
    let result: Envelope<User[]>;
    let users: User[];

    try {
      if(key) {
        let q = QueryBuildHandler.GetOrmQuery(key);
        users = await User.findAll(q);
      }
      else {
        users = await User.all();
      }
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
        JSON.stringify(entry),
      ],
    };

    try {
      let u = await User.sequelize.query(q);
      result = new Envelope<User>(u[0][0].Type, u[0][1], u[0][0].Message);
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
