// Loading external dependencies.
import { Body, Controller, Post } from 'routing-controllers';

@Controller()
export class EchoController {
  /**
   * Echoing request
   * @entry request body, which will be returned back
   */
  @Post('/echo')
  public onPost(@Body({ validate: false }) entry: any) {
    return entry;
  }
}
