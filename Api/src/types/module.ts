/**
 * Application types
 */
export enum ModuleType {
  /**
   * Base module. Used for crossobject mapping, registries, configs, etc.
   */
  Core,
  /**
   * Authentication module. Used to work with everything relating to auth, users, roles.
   */
  Anubis,
  /**
   * Approvement module. Used to provide base "Request - Contract - Invoice" functionality.
   */
  Imhotep,
  /**
   * Task management module. Used to work with anything related to resources, time, tasks.
   */
  Isida,
  /**
   * Reporting module. Used to generate, query, store, calculate data and etc.
   */
  Osiris,
}