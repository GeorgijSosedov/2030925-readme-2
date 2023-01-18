import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getJwtConfig } from 'apps/users/src/config/jwt.config';
import { BlogUserMemoryRepository } from '../../blog-user/blog-user-memory.repository';
import { BlogUserModule } from '../../blog-user/blog-user.module';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
    imports: [
        BlogUserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig,
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    
})
export class AuthModule {}
