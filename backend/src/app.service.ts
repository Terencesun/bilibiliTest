// @ts-ignore
import { Injectable } from '@nestjs/common';
import {InjectModel, InjectConnection} from '@nestjs/mongoose';
import {Model, Connection} from 'mongoose';

@Injectable()
export class AppService {

  constructor(
      @InjectConnection() private readonly mainConnection: Connection,
  ) {
  }

  async info() {
    const code = {
      OK: 10,
    };

  }

  async birthday() {}

  async sex() {}

  async level() {}
}
