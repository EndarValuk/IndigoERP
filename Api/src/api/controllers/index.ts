import { DiagnosticController } from './diagnostic';
import { EchoController } from './echo';
import { ObjectActionController } from './core/generic_object';
import { ReferenceController } from './core/reference';
import { UsersController } from './core/users';

const Controllers = [
  DiagnosticController,
  EchoController,

  ObjectActionController,
  ReferenceController,
  UsersController
];

export { Controllers };