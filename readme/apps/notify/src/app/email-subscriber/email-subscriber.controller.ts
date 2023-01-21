import { Injectable } from "@nestjs/common";
import { CommandEvent } from "@readme/shared-types";
import { EventPattern } from '@nestjs/microservices';
import { CreateSubscriberDTO } from "./create-subscriber.dto";
import { EmailSubscriberService } from "./email-subscriber.service";

@Injectable()
export class EmailSubscriberController {
    constructor(
        private readonly emailSubscriberService: EmailSubscriberService,
    ) {}

    @EventPattern({ cmd: CommandEvent.AddSubscriber})
    public async create(subscriber: CreateSubscriberDTO) {
        return this.emailSubscriberService.addSubscriber(subscriber);
    }
}