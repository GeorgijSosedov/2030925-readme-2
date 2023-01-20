import { Injectable } from "@nestjs/common";
import { Subscriber } from "@readme/shared-types";
import { EMAIL_ADD_SUBSCRIBER_SUBJECT } from "./mail.constant";
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    public async sendNotifyNewSubscriber(subscriber: Subscriber) {
        await this.mailerService.sendMail({
            to: subscriber.mail,
            subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
            template: './add-subscriber',
            context: {
                user: `${subscriber.firstName} ${subscriber.lastName}`,
                mail: `${subscriber.mail}`,
            }
        })
    }
}