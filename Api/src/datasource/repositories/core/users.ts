import { Provides } from "typescript-ioc";

import { BaseRepository } from '@indigo/datasource/repositories/interfaces';
import { User, ObjectProperty, Envelope } from '@indigo/datasource/models';
import { ResultType } from '@indigo/types';

@Provides(UsersRepository)
class UsersRepository implements BaseRepository<User, string> {
  public async Read(key: string): Promise<Envelope<User>> {
    let result: Envelope<User>;

    let predicate = {
      where: { login: key }
    };

    try {
      let user = await User.findOne(predicate);
      if(user) {
        let propertyPredicate = {
          where: {
            ref_object: user.id,
            ref_object_type: 5
          }
        };

        try {
          user.setDataValue("object_properties", await ObjectProperty.all(propertyPredicate));
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
      result = new Envelope(ResultType.Success, users);
    }
    catch(e) {
      result = new Envelope(ResultType.ErrorDatabaseRead, e);
    }
    return result;
  }

  public async Create(entry: User): Promise<Envelope<User>> {
    let result: Envelope<User>;

    let q = {
      query: `SELECT * FROM "core"."create_user"(?,?,?,?,?)`,
      values: [
        entry.login,
        entry.name,
        entry.patronymic,
        entry.surname,
        entry.password
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

export { UsersRepository };