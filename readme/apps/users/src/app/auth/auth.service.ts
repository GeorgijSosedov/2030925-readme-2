import { Inject, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { CommandEvent, User, UserRole } from '@readme/shared-types';
import * as dayjs from 'dayjs'
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG, RABBITMQ_SERVICE } from './auth.constant';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
    constructor(
        private readonly blogUserRepository: BlogUserRepository,
        private readonly jwtService: JwtService,
        @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
        ) {}

    async register(dto: CreateUserDTO) {
        const {mail,firstName,lastName,password,regDate} = dto;
        const blogUser = { 
        mail,firstName,lastName, role: UserRole.User,
        avatar: '',regDate: dayjs(regDate).toDate(),
        pasHash: ''
        };

    const existUser = await this.blogUserRepository
    .findByMail(mail)

    if(existUser) {
        throw new UnauthorizedException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser)
    .setPassword(password);

    const createdUser = await this.blogUserRepository
        .create(userEntity);

        this.rabbitClient.emit(
            { cmd: CommandEvent.AddSubscriber },
            {
              mail: createdUser.mail,
              firstName: createdUser.firstName,
              lastName: createdUser.lastName,
              userId: createdUser.id.toString(),
            }
        );

        return createdUser;
    }

    async verifyUser(dto: LoginUserDTO) {
        const {mail,password} = dto;
        const existUser = await this.blogUserRepository.findByMail(mail);

        if (existUser) {
            throw new Error(AUTH_USER_NOT_FOUND);
        }

        const blogUserEntity = new BlogUserEntity(existUser)
        if (! await blogUserEntity.comparePassword(password)) {
            throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
        }

        return blogUserEntity.toObject()
    }

    async getUser(id: string) {
        return this.blogUserRepository.findById(id);
    }
    
    async loginUser(user: User) {
        const payload = {
          sub: user.id,
          email: user.mail,
          role: user.role,
          firstname: user.firstName,
          lastname: user.lastName,
        };
    return {
        acces_token: await this.jwtService.signAsync(payload),
    }
    }
}
