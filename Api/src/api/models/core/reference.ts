import { QueryModel } from "../query";

class ReferenceQueryModel extends QueryModel {
  public Project: string = "core";

  public Type: string = "reference";

  public Levels: string[];
}

export { ReferenceQueryModel };