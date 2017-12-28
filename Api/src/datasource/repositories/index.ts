import { ReferenceQueryModel } from '@indy/api/models';
import { Envelope } from '@indy/datasource/models';
import { IRepository } from '@indy/datasource/repositories/interfaces';
import { ObjectQueryModel, QueryModel } from '@indy/api/models';
import { Mapper } from '@indy/datasource';
import { ObjectType, ApplicationType } from '@indy/types';

abstract class BaseRepository<T, TK> implements IRepository<T, TK> {
  public QueryManager: any;

  public Application: ApplicationType;

  public ObjectType: ObjectType;

  public QueryHelper(entry?: ObjectQueryModel | QueryModel): any {
    let q: any;

    if(entry && entry instanceof QueryModel) {
      q = {
        attributes: [''],
        group: [''],
        where: {}
      };

      if(entry.Fields) {
        q.attributes = entry.Fields.toLowerCase().split(',');
      }
      else
        delete q.attributes;

      if(entry.GroupBy) {
        q.group = entry.GroupBy.toLowerCase().split(',');
      }
      else
        delete q.group;

      if(entry.Where) {
        q.where = JSON.parse(JSON.stringify(entry.Where));
      }
      else
        delete q.where;
    }
    else if(entry && entry instanceof ObjectQueryModel) {
      q = {
        where: {
          ref_object: entry.Ref_Object,
          ref_object_type: entry.Ref_ObjectType
        }
      };
    }
    else {
      q = null;
    }
    return q;
  }

  constructor(objectType: ObjectType, application: ApplicationType = ApplicationType.Core) {
    this.ObjectType = objectType;
    this.Application = application;

    this.QueryManager = Mapper(this.Application, this.ObjectType);
  }

  Read(key: TK | ReferenceQueryModel): Envelope<T> | Promise<Envelope<T>> {
    throw new Error("Method not implemented.");
  }

  ReadAll(): Envelope<T[]> | Promise<Envelope<T[]>> {
    throw new Error("Method not implemented.");
  }

  Create(entry: T): Envelope<T> | Promise<Envelope<T>> {
    throw new Error("Method not implemented.");
  }

  Update(entry: T): Envelope<T> | Promise<Envelope<T>> {
    throw new Error("Method not implemented.");
  }

  Delete(key: TK): Envelope<boolean> | Promise<Envelope<boolean>> {
    throw new Error("Method not implemented.");
  }
}

export { BaseRepository };
export * from './core/generic_object';
export * from './core/reference';

export * from './anubis/users';