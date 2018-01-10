/**
 * Generic API query model. Used for parsing client requests
 * and transforming them into SQL queries.
 */
export class QueryModel {
  /**
   * Requesting distinct predicate to be used in query generation.
   */
  public Distinct: boolean = false;
  /**
   * List of fields, which will be included in query result set.
   */
  public FieldsPredicate: string;
  /**
   * List of fields, which will be included in ${GROUP BY} query predicate.
   */
  public GroupBy: string;
  /**
   * List of fields, which will be included in ${ORDER BY} query predicate.
   */
  public OrderBy: string;
  /**
   * Number of rows to be skipped from generated query result set.
   */
  public Skip: number = 0;
  /**
   * Number of rows to be selected from generated query result set.
   */
  public Take: number = 0;
  /**
   * Conditions depending on which, we will generate query.
   */
  public WherePredicate: string;
}
