import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { mongoDbOptions, getMongoDbConfig } from '../config/mongodb.config';
import { NOTIFY_SERVICE_ENV_PATH } from './app.constant';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { validateEnvironments } from './env.validation';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { mailOptions } from '../config/mail.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: NOTIFY_SERVICE_ENV_PATH,
      load: [mongoDbOptions, rabbitMqOptions, mailOptions],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    EmailSubscriberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
