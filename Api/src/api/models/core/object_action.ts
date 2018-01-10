import { ObjectQueryModel } from '@indyecm/defs/models';

export class ObjectActionQueryModel extends ObjectQueryModel {
  public Ref_Action: number;

  public Ref_Invoker: string;

  public Remark: string;
}