import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MailModule } from "../mail/mail.module";
import { EmailSubscriberController } from "./email-subscriber.controller";
import { EmailSubscriberSchema, EmailSubscribersModel } from "./email-subscriber.model";
import { EmailSubscriberRepository } from "./email-subscriber.repository";
import { EmailSubscriberService } from "./email-subscriber.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: EmailSubscribersModel.name, schema: EmailSubscriberSchema }
        ]),
        MailModule
    ],
    controllers: [
        EmailSubscriberController
    ],
    providers: [
        EmailSubscriberService,
        EmailSubscriberRepository
    ],
})
export class EmailSubscriberModule {}