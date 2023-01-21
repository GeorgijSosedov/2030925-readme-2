import { IsEmail, IsNotEmpty } from "class-validator";
import {
    MAIL_NOT_VALID, FIRST_NAME_IS_EMPTY, 
    LAST_NAME_IS_EMPTY, USER_ID_IS_EMPTY 
} from "./email-subscriber.constant";

export class CreateSubscriberDTO {
    @IsEmail({}, {
        message: MAIL_NOT_VALID
     })
    mail: string;
    @IsNotEmpty({
        message: FIRST_NAME_IS_EMPTY
    })
    firstName: string;
    @IsNotEmpty({
        message: LAST_NAME_IS_EMPTY
    })
    lastName: string;
    @IsNotEmpty({
        message: USER_ID_IS_EMPTY
    })
    userId: string;
}