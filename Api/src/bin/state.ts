import { TypeState } from 'typestate';

import { SystemStateType } from '@indigo/types';

class SystemState {
  private static _instance: TypeState.FiniteStateMachine<SystemStateType>;

  private constructor() {
    if(SystemState._instance){
      throw new Error("Error: Instantiation failed. Singleton module! Use .getInstance() instead of new.");
    }
    console.log("ST Create")
    SystemState._instance = new TypeState.FiniteStateMachine<SystemStateType>(SystemStateType.Idle);
  }

  static getInstance() {
    if (!SystemState._instance) {
      SystemState._instance = new TypeState.FiniteStateMachine<SystemStateType>(SystemStateType.Idle);
      // Configuring possible state transitions
      SystemState._instance.from(SystemStateType.Idle).to(SystemStateType.Starting);
      SystemState._instance.from(SystemStateType.Starting).to(SystemStateType.NoDatabaseConnection);
      SystemState._instance.from(SystemStateType.Starting).to(SystemStateType.Working);

      SystemState._instance.from(SystemStateType.NoDatabaseConnection).to(SystemStateType.NoDatabaseConnection);
      SystemState._instance.from(SystemStateType.NoDatabaseConnection).to(SystemStateType.Working);
    }
    return SystemState._instance;
  }
}

export default SystemState;