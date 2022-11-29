import { Injectable } from '@nestjs/common';
import { UserRole } from '@readme/shared-types';
import * as dayjs from 'dayjs'
import { BlogUserMemoryRepository } from '../blog-user/blog-user-memory.repository';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './auth.constant';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly blogUserRepository: BlogUserMemoryRepository
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
        throw new Error(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser)
    .setPassword(password)

    return this.blogUserRepository
        .create(userEntity);
    }

    async verifyUser(dto: LoginUserDTO) {
        const {mail,password} = dto;
        const existUser = await this.blogUserRepository.findByMail(mail);

        if (existUser) {
            throw new Error(AUTH_USER_NOT_FOUND);
        }

        const blogUserEntity = new BlogUserEntity(existUser)
        if (! await blogUserEntity.comparePassword(password)) {
            throw new Error(AUTH_USER_PASSWORD_WRONG);
        }

        return blogUserEntity.toObject()
    }

    async getUser(id: string) {
        return this.blogUserRepository.findById(id);
    }
    
}
