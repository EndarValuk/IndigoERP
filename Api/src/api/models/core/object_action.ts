import { ObjectQueryModel } from '@indigo/api/models';

export class ObjectActionQueryModel extends ObjectQueryModel {
  public Ref_Action: number;

  public Ref_Invoker: string;

  public Remark: string;
}