import { Inject } from "typescript-ioc";

import { SystemState } from './state';
import { SystemStateType } from 'types';

class StateManager {
  @Inject
  private State: SystemState;

  public go(newState: SystemStateType): void {
    this.State.go(newState);
  }

  public get currentState(): SystemStateType {
    return this.State.currentState;
  }
}

export { StateManager };