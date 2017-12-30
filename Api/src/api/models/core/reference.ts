import { QueryModel } from "../query";
import { ModuleType } from '@indy/types';

export class ReferenceQueryModel extends QueryModel {
  public Project: ModuleType = ModuleType.Core;

  public Type: string = "reference";

  public Levels: string[];
}