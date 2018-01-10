// Loading external dependencies.
import { Singleton } from 'typescript-ioc';
import { TypeState } from 'typestate';

// Loading local dependencies.
import { SystemStateType } from '@indyecm/defs/types';

@Singleton
export class SystemState extends TypeState.FiniteStateMachine<SystemStateType> {
  public constructor() {
    super(SystemStateType.Idle);
    // Configuring possible state transitions
    this.from(SystemStateType.Idle).to(SystemStateType.Starting);
    this.from(SystemStateType.Starting).to(SystemStateType.NoDatabaseConnection);
    this.from(SystemStateType.Starting).to(SystemStateType.Working);

    this.from(SystemStateType.NoDatabaseConnection).to(SystemStateType.NoDatabaseConnection);
    this.from(SystemStateType.NoDatabaseConnection).to(SystemStateType.Working);
  }
}
