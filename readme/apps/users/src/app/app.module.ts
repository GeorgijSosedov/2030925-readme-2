import { Module } from '@nestjs/common';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthModule } from './auth/auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import databaseConfig from '../config/database.config';
import { validateEnvironments } from './env.validation';
import { MongooseModule } from '@nestjs/mongoose';
import { GetMongoDBConfig } from '../config/mongodb.config';
import { jwtOptions } from '../config/jwt.config';
import { rabbitMqOptions } from '../config/rabbitmq.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal:true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, jwtOptions, rabbitMqOptions],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(
      GetMongoDBConfig()
    ),
    AuthModule,
    BlogUserModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
