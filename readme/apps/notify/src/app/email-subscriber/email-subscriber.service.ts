import { Injectable } from "@nestjs/common";
import { MailService } from "../mail/mail.service";
import { CreateSubscriberDTO } from "./create-subscriber.dto";
import { MAIL_SUBSCRIBER_EXISTS } from "./email-subscriber.constant";
import { EmailSubscriberEntity } from "./email-subscriber.entity";
import { EmailSubscriberRepository } from "./email-subscriber.repository";

@Injectable()
export class EmailSubscriberService {
    constructor(
        private readonly emailSubscriberRepository: EmailSubscriberRepository,
        private readonly mailService: MailService,
    ) {}

    public async addSubscriber(subscriber: CreateSubscriberDTO) {
        const { mail } = subscriber
        const existsSubscriber = await this.emailSubscriberRepository.findByEmail(mail);

        if(existsSubscriber) {
            throw new Error(MAIL_SUBSCRIBER_EXISTS);
        }

    this.mailService.sendNotifyNewSubscriber(subscriber);

    return this.emailSubscriberRepository
    .create(new EmailSubscriberEntity(subscriber));
    }

    
}