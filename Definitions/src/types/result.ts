/**
 * Operation result types.
 * Used mostly in API, to determine detailed operation results and let know client application about it.
 */
export enum ResultType {
//#region Base result flags

  ///<summary>
  /// No result yet
  ///</summary>
  NoResultYet                    = 1 << 0,
  ///<summary>
  /// Operation successfull
  ///</summary>
  Success                        = 1 << 1,
  ///<summary>
  /// Operation ended with error
  ///</summary>
  Error                          = 1 << 2,

//#endregion

//#region Api service interaction type flags

  Database                       = 1 << 3,
  FileService                    = 1 << 4,
  ApiService                     = 1 << 5,
  AuthService                    = 1 << 6,
  Memory                         = 1 << 7,
  Notification                   = 1 << 8,
  Configuration                  = 1 << 9,

//#endregion

//#region Operation type flags

  Connection                     = 1 << 10,
  Access                         = 1 << 11,
  Read                           = 1 << 12,
  Create                         = 1 << 13,
  Update                         = 1 << 14,
  Patch                          = 1 << 15,
  Delete                         = 1 << 16,

//#endregion

//#region Result type flags

  NotFound                       = 1 << 17,
  Exists                         = 1 << 18,
  NYI                            = 1 << 19,
  BadInput                       = 1 << 20,
  Unknown                        = 1 << 21,
  Denied                         = 1 << 22,

//#endregion

//#region Combination flags

  //#region Working with configuration

  ErrorConfigurationAccess       = Error | Configuration | Access,
  ErrorConfigurationRead         = Error | Configuration | Read,
  ErrorConfigurationReadNotFound = ErrorConfigurationRead | NotFound,
  ErrorConfigurationReadBadInput = ErrorConfigurationRead | BadInput,

  //#endregion

  //#region Working with database

  ErrorDatabase                  = Error | Database,
  ErrorDatabaseConnection        = ErrorDatabase | Connection,
  ErrorDatabaseAccess            = ErrorDatabase | Access,

  ErrorDatabaseRead              = Error | Database | Read,
  ErrorDatabaseReadNotFound      = ErrorDatabaseRead | NotFound,
  ErrorDatabaseReadBadInput      = ErrorDatabaseRead | BadInput,
  ErrorDatabaseReadNYI           = ErrorDatabaseRead | NYI,
  ErrorDatabaseReadDenied        = ErrorDatabaseRead | Denied,

  ErrorDatabaseCreate            = Error | Database | Create,
  ErrorDatabaseCreateExists      = ErrorDatabaseCreate | Exists,
  ErrorDatabaseCreateBadInput    = ErrorDatabaseCreate | BadInput,
  ErrorDatabaseCreateNYI         = ErrorDatabaseCreate | NYI,

  ErrorDatabaseUpdate            = Error | Database | Update,
  ErrorDatabaseUpdateNotFound    = ErrorDatabaseUpdate | NotFound,
  ErrorDatabaseUpdateBadInput    = ErrorDatabaseUpdate | BadInput,
  ErrorDatabaseUpdateNYI         = ErrorDatabaseUpdate | NYI,

  ErrorDatabasePatch             = Error | Database | Patch,
  ErrorDatabasePatchNotFound     = ErrorDatabasePatch | NotFound,
  ErrorDatabasePatchBadInput     = ErrorDatabasePatch | BadInput,
  ErrorDatabasePatchNYI          = ErrorDatabasePatch | NYI,

  ErrorDatabaseDelete            = Error | Database | Delete,
  ErrorDatabaseDeleteNotFound    = ErrorDatabaseDelete | NotFound,
  ErrorDatabaseDeleteBadInput    = ErrorDatabaseDelete | BadInput,
  ErrorDatabaseDeleteNYI         = ErrorDatabaseDelete | NYI,

  //#endregion

  //#region Working with fileservice

  ErrorFileService               = Error | FileService,
  ErrorFileServiceAccess         = ErrorFileService | Access,
  ErrorFileServiceCreate         = ErrorFileService | Create,

  //#endregion

//#endregion
}