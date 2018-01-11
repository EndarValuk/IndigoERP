import * as os from 'os';
import { Controller, Get } from 'routing-controllers';

@Controller()
export class DiagnosticController {
  /**
   * Diagnostic request
   */
  @Get('/diagnostic')
  public onPost() {
    let freeMb = Math.floor(os.freemem() / 1024 / 1024);
    let totalMb = Math.floor(os.totalmem() / 1024 / 1024);

    return {
      Cpus: os.cpus().length,
      Memory: `${freeMb}Mb / ${totalMb}Mb (${Math.floor(os.freemem() / os.totalmem() * 100)}% free)`,
      Network: os.networkInterfaces(),
      Platform: `${os.platform()} on ${os.arch()} architecture`,
    };
  }
}
