import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  info() {
    return 'Hello World!';
  }
}
