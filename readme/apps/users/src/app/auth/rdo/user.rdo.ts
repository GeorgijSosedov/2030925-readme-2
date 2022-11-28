import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UserRDO {
    @ApiProperty({
        description: 'Уникальный идентификатор пользователя',
        example: '17'
      })
    @Expose({ name: '_id'})
    public id: string;
    @ApiProperty({
        description: 'Уникальный адрес пользователя',
        example: 'test@mail.ru'
      })
    @Expose()
    public mail: string;
    @ApiProperty({
        description: 'Имя пользователя',
        example: 'Jaden'
      })
    @Expose()
    public firstName: string;
    @ApiProperty({
        description: 'Фамилия пользователя',
        example: 'Jelly'
      })
    @Expose()
    public lastName: string;
    @ApiProperty({
        description: 'Дата регистрации пользователя',
        example: '05.04.2004'
      })
    @Expose()
    public regDate: string;
    @ApiProperty({
        description: 'Аватар пользователя',
        example: '/images/avatar.png'
      })
    @Expose()
    public avatar: string;
}