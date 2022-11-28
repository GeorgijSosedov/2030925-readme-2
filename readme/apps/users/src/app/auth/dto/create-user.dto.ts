import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
    @ApiProperty({
        description: 'Уникальный адрес пользователя',
        example: 'test@mail.ru'
    })
    public mail: string;
    @ApiProperty({
        description: 'Имя пользователя',
        example: 'Jaden'
    })
    public firstName: string;
    @ApiProperty({
        description: 'Фамилия пользователя',
        example: 'Jelly'
    })
    public lastName: string;
    @ApiProperty({
        description: 'Пароль пользователя',
        example: '123456'
    })
    public password: string;
    @ApiProperty({
        description: 'Дата регистрации пользователя',
        example: '05.04.2004'
    })
    public regDate: string;
}