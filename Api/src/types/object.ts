/**
 * Object types
 */
export enum ObjectType {
  /**
   * Generic object type, used to define any of the object types.
   */
  Generic = -1,
  /**
   * Сontract, which is concluded between two business units/counteragents.
   */
  Contract = 0,
  /**
   * Primary document, particually, incoming invoice.
   */
  PrimaryDocument = 1,
  /**
   * Extension for contract, changing dates, amounts, etc.
   */
  ContractExtension = 2,
  /**
   * Business unit
   */
  BusinessUnit = 3,
  /**
   * Counteragent
   */
  Counteragent = 3,
  /**
   * Payment order
   */
  PaymentOrder = 4,
  /**
   * User, living human entity, working in our application.
   */
  User = 5,
  /**
   * Task, assigned to a resource
   */
  Task = 6,
  /**
   * Knowledge base article
   */
  Article = 12,
}