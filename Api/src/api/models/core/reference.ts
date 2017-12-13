import { QueryModel } from "../query";

export class ReferenceQueryModel extends QueryModel {
  public Project: string = "core";

  public Type: string = "reference";

  public Levels: string[];
}

export { QueryModel };