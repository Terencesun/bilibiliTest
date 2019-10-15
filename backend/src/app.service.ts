// @ts-ignore
import { Injectable } from '@nestjs/common';
import {InjectModel, InjectConnection} from '@nestjs/mongoose';
import {Model, Connection} from 'mongoose';
import { info, birthday, level, sex } from './app.pipeline';

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
    const res = await this.mainConnection.useDb('bilibili').collection('SpaceInfo').aggregate(info).toArray();
    return {
      code: code.OK,
      msg: {
        sample: res[0].sample,
        date: new Date().getTime(),
      }
    }
  }

  async birthday() {
    const code = {
      OK: 10,
    };
    const dict = {
      1: '第一季度',
      2: '第二季度',
      3: '第三季度',
      4: '第四季度',
    };
    const res = await this.mainConnection.useDb('bilibili').collection('SpaceInfo').aggregate(birthday).toArray();
    let data = [];
    for (let key = 1; key <= 4; key++) {
      for (let item of res) {
        if (item._id === key) {
          item.quarter = dict[key];
          data.push(item);
        }
      }
    }
    return {
      code: code.OK,
      msg: data,
    };
  }

  async sex() {
    const code = {
      OK: 10,
    };
    const res = await this.mainConnection.useDb('bilibili').collection('SpaceInfo').aggregate(sex).toArray();
    for (let item of res) {
      item.percent = parseFloat(item.percent.toFixed(2));
    }
    return {
      code: code.OK,
      msg: res
    };
  }

  async level() {
    const code = {
      OK: 10,
    };
    const res = await this.mainConnection.useDb('bilibili').collection('SpaceInfo').aggregate(level).toArray();
    let data = [];
    for (let key = 0; key <= 6; key++) {
      for (let item of res) {
        if (item.title === key) {
          item.score = parseFloat(item.score.toFixed(2));
          data.push(item);
        }
      }
    }
    return {
      code: code.OK,
      msg: data
    };
  }
}
