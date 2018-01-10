// External dependencies
import { Inject } from "typescript-ioc";
// Local dependencies
import { SystemStateType } from '@indyecm/defs/types';
import { SystemState } from './state';

/**
 * Application state manager
 */
export class StateManager {
  @Inject
  private _state: SystemState;

  /**
   * Changing current state of the appliation
   * @param newState new state where we go
   */
  public go(newState: SystemStateType): void {
    this._state.go(newState);
  }

  /**
   * Current application state
   */
  public get currentState(): SystemStateType {
    return this._state.currentState;
  }
}