import { TypeState } from 'typestate';

import { SystemStateType } from '@indigo/types';
import { Singleton } from 'typescript-ioc';

@Singleton
export class SystemState extends TypeState.FiniteStateMachine<SystemStateType>{
  constructor() {
    super(SystemStateType.Idle);
    // Configuring possible state transitions
    this.from(SystemStateType.Idle).to(SystemStateType.Starting);
    this.from(SystemStateType.Starting).to(SystemStateType.NoDatabaseConnection);
    this.from(SystemStateType.Starting).to(SystemStateType.Working);

    this.from(SystemStateType.NoDatabaseConnection).to(SystemStateType.NoDatabaseConnection);
    this.from(SystemStateType.NoDatabaseConnection).to(SystemStateType.Working);
  }
}