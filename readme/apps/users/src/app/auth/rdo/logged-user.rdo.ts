import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class LoggedUserRDO {
      @ApiProperty({
        description: 'Уникальный идентификатор пользователя',
        example: '15'
      })
    @Expose({name: '_id'})
    public id: string;
    @ApiProperty({
        description: 'Уникальный адрес пользователя',
        example: 'test@mail.ru'
      })
    @Expose()
    public mail: string;
    @ApiProperty({
        description: 'Токен доступа',
        example: 'user@user.local'
      })
    @Expose()
    public accessToken: string;
}