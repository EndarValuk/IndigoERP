import { QueryModel } from '@indyecm/defs/models';
import { ModuleType } from '@indyecm/defs/types';

export class ReferenceQueryModel extends QueryModel {
  public Project: ModuleType = ModuleType.Core;

  public Type: string = 'reference';

  public Levels: string[];
}
