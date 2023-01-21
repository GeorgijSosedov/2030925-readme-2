import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getJwtConfig } from 'apps/users/src/config/jwt.config';
import { getRabbitMqConfig } from 'apps/users/src/config/rabbitmq.config';
import { BlogUserModule } from '../../blog-user/blog-user.module';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from '../auth.constant';

@Module({
    imports: [
        BlogUserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig,
        }),
        ClientsModule.registerAsync([
        {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService],
        }
        ])
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    
})
export class AuthModule {}
