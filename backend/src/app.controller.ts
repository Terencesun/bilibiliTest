// @ts-ignore
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('info')
  async info() {
    return await this.appService.info();
  }

  @Get('birthday')
  async birthday() {
    return await this.appService.info();
  }

  @Get('sex')
  async sex() {
    return await this.appService.info();
  }

  @Get('level')
  async level() {
    return await this.appService.info();
  }
}
