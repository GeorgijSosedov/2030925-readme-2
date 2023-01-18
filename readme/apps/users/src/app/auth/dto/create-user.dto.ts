import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsISO8601, IsString } from "class-validator";
import { AUTH_USER_BIRTH_DATE_NOT_VALID, AUTH_USER_EMAIL_NOT_VALID } from "../auth.constant";

export class CreateUserDTO {
    @ApiProperty({
        description: 'Уникальный адрес пользователя',
        example: 'test@mail.ru',
    })
    @IsEmail(
        {}, 
        {message: AUTH_USER_EMAIL_NOT_VALID},
    )
    public mail: string;
    @ApiProperty({
        description: 'Имя пользователя',
        example: 'Jaden'
    })
    @IsString()
    public firstName: string;
    @ApiProperty({
        description: 'Фамилия пользователя',
        example: 'Jelly'
    })
    @IsString()
    public lastName: string;
    @ApiProperty({
        description: 'Пароль пользователя',
        example: '123456'
    })
    @IsString()
    public password: string;
    @ApiProperty({
        description: 'Дата регистрации пользователя',
        example: '05.04.2004'
    })
    @IsISO8601({
        message: AUTH_USER_BIRTH_DATE_NOT_VALID
    })
    public regDate: string;
}