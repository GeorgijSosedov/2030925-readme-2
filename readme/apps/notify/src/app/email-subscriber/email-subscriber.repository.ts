import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CRUDRepository } from "@readme/core";
import { Subscriber } from "@readme/shared-types";
import { Model } from "mongoose";
import { EmailSubscriberEntity } from "./email-subscriber.entity";
import { EmailSubscribersModel } from "./email-subscriber.model";

@Injectable()
export class EmailSubscriberRepository implements CRUDRepository<EmailSubscriberEntity, string, Subscriber> {
    constructor(
        @InjectModel(EmailSubscribersModel.name) private readonly emailSubscriberModel: Model<EmailSubscribersModel>
    ) {}

    public async create(item: EmailSubscriberEntity): Promise<Subscriber> {
        const newEmailSubscriber = new this.emailSubscriberModel(item);
        return newEmailSubscriber
    }

    public async destroy(id: string): Promise<void> {
        this.emailSubscriberModel.deleteOne();
    }

    public async findById(id: string): Promise<Subscriber | null> {
        return this.emailSubscriberModel
        .findOne({ id })
        .exec();
    }

    public async update(id: string, item: EmailSubscriberEntity): Promise<Subscriber> {
        return this.emailSubscriberModel
        .findByIdAndUpdate(id)
        .exec();
    }

    public async findByEmail(email: string): Promise<Subscriber | null> {
        return this.emailSubscriberModel
        .findOne({ email })
        .exec();
    }
}