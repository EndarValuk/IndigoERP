export class QueryModel {
  public Distinct: boolean = false;
  public Fields: string;
  public GroupBy: string;
  public OrderBy: string;
  public Skip: number = 0;
  public Take: number = 0;
  public Where: string;
}