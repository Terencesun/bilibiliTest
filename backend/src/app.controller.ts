import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('info')
  async info() {
    return this.appService.info();
  }

  @Get('birthday')
  async birthday() {}

  @Get('sex')
  async sex() {}

  @Get('level')
  async level() {}
}
