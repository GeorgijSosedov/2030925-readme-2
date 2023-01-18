import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { AUTH_USER_EMAIL_NOT_VALID } from "../auth.constant";

export class LoginUserDTO {
    @ApiProperty({
        description: 'Уникальный адрес пользователя',
        example: 'test@mail.ru'
    })
    @IsEmail(
    {},
    {message: AUTH_USER_EMAIL_NOT_VALID}
    )
    public mail: string;
    @ApiProperty({
        description: 'Пароль пользователя',
        example: '123456'
    })
    @IsString()
    public password: string;
}