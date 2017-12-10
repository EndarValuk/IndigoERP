import { Controller, Body, Post } from "routing-controllers";

@Controller()
export class EchoController {
  /**
   * Echoing request
   */
  @Post("/echo")
  onPost(@Body({ validate: false }) entry: any) {
    return entry;
  }
}