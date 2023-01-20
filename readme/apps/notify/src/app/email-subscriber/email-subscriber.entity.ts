import { Entity } from "@readme/core";
import { Subscriber } from "@readme/shared-types";

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, Subscriber {
    public id: string;
    public mail: string;
    public firstName: string;
    public lastName: string;
    public userId: string;

    constructor(emailSubscriber: Subscriber) {
        this.fillEntity(emailSubscriber);
    }

    public fillEntity(entity) {
        this.mail = entity.mail;
        this.firstName = entity.firstName;
        this.lastName = entity.lastName;
        this.userId = entity.userId;
        this.id = entity.id ?? '';
    }

    public toObject(): EmailSubscriberEntity {
        return { ...this }
    }
}