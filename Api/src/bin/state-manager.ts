// Loading external dependencies.
import { Inject } from 'typescript-ioc';

// Loading local dependencies.
import { SystemStateType } from '@indyecm/defs/types';

import { SystemState } from './state';

/**
 * Application state manager
 */
export class StateManager {
  /**
   * Application state singleton.
   */
  @Inject
  private state: SystemState;

  /**
   * Changing current state of the appliation
   * @param newState new state where we go
   */
  public go(newState: SystemStateType): void {
    this.state.go(newState);
  }

  /**
   * Current application state
   */
  public get currentState(): SystemStateType {
    return this.state.currentState;
  }
}
