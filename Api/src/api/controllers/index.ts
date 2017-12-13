import { DiagnosticController } from './diagnostic';
import { EchoController } from './echo';
import { ReferenceController } from './core/reference';
import { UsersController } from './core/users';

const Controllers = [
  DiagnosticController,
  EchoController,

  ReferenceController,
  UsersController
];

export { Controllers };