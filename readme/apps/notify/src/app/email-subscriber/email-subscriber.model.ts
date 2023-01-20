import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Subscriber } from "@readme/shared-types";

const SUBSCRIBERS_COLLECTION_NAME = 'email-subscribers';

@Schema({
    collection: SUBSCRIBERS_COLLECTION_NAME,
    timestamps: true,
})
export class EmailSubscribersModel extends Document implements Subscriber {
    @Prop()
    public mail: string;

    @Prop()
    public firstName: string;

    @Prop()
    public lastName: string;

    @Prop()
    public userId: string;
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscribersModel)