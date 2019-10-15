// @ts-ignore
import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
// @ts-ignore
import {MongooseModule} from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [],
            useFactory: async () => ({
                uri: 'mongodb://developer:123456@192.168.218.47:40000,192.168.218.47:40001,192.168.218.47:40002/test?replicaSet=ATFX&authSource=admin',
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                poolSize: 100,
                reconnectTries: Number.MAX_VALUE,
            }),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
