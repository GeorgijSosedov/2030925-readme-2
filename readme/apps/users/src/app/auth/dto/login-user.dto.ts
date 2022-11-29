import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDTO {
    @ApiProperty({
        description: 'Уникальный адрес пользователя',
        example: 'test@mail.ru'
    })
    public mail: string;
    @ApiProperty({
        description: 'Пароль пользователя',
        example: '123456'
    })
    public password: string;
}