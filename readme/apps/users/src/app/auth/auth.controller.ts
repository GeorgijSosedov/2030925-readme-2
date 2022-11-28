import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { LoggedUserRDO } from './rdo/logged-user.rdo';
import { UserRDO } from './rdo/user.rdo';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register')
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Пользователь успешно зарегистрирован!'
    })
    async create(@Body() dto: CreateUserDTO) {
        const newUser = await this.authService.register(dto);

        return fillObject(UserRDO,newUser);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        type: LoggedUserRDO,
        status: HttpStatus.OK,
        description: 'Пользователь успешно вошёл в систему',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Пользователь успешно вышел из системы'
    })
    async login(@Body() dto: LoginUserDTO) {
        const verifiedUser = await this.authService.verifyUser(dto);

        return fillObject(LoggedUserRDO,verifiedUser);
    }

    @Get(':id')
    @ApiResponse({
        type: UserRDO,
        status: HttpStatus.OK,
        description: 'Пользователь найден!'
    })
    async show(@Param('id') id: string) {
        const existUser = await this.authService.getUser('id');

        return fillObject(UserRDO,existUser);
    }
}
