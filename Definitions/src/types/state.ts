/**
 * Application state types.
 * Used in state machine, to handle application-wide events, and do consequent actions.
 */
export enum SystemStateType {
  Idle                    = 0x0,
  Starting                = 0x1,
  CheckingLicense         = 0x2,
  Working                 = 0x3,
  NoDatabaseConnection    = 0x4,
  NoFilestorageConnection = 0x5,
}
