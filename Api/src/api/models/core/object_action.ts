import { ObjectQueryModel } from '@indigo/api/models';

class ObjectActionQueryModel extends ObjectQueryModel {
  public Ref_Action: number;

  public Ref_Invoker: string;

  public Remark: string;
}

export { ObjectActionQueryModel };