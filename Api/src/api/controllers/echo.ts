// Loading external dependencies.
import { Controller, Body, Post } from "routing-controllers";

@Controller()
export class EchoController {
  /**
   * Echoing request
   * @entry request body, which will be returned back
   */
  @Post("/echo")
  onPost(@Body({ validate: false }) entry: any) {
    return entry;
  }
}