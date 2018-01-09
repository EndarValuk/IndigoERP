/**
 * Application modules
 */
export enum ModuleType {
  /**
   * Base module. Used for crossobject mapping, registries, configs, etc.
   */
  Core = "Core",
  /**
   * Authentication module. Used to work with everything relating to auth, users, roles.
   */
  Anubis = "Anubis",
  /**
   * Approvement module. Used to provide base "Request - Contract - Invoice" functionality.
   */
  Imhotep = "Imhotep",
  /**
   * Task management module. Used to work with anything related to resources, time, tasks.
   */
  Isida = "Isida",
  /**
   * Reporting module. Used to generate, query, store, calculate data and etc.
   */
  Osiris = "Osiris",
}
