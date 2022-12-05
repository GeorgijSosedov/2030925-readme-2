import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User, UserRole } from "@readme/shared-types";
import { string } from "joi";

@Schema({ 
    collection: 'users',
})

export class BlogUserModel extends Document implements User {
    @Prop()
    public avatar: string
    @Prop({
        required: true,
        unique: true,
    })
    public mail: string;
    @Prop({
        required: true,
    })
    public firstName: string;
    @Prop({
        required: true,
    })
    public lastName: string;
    @Prop({
        required: true,
    })
    public regDate: Date;
    @Prop({ 
        required: true,
    })
    public pasHash: string;
    @Prop({
        required: true,
        type: string,
        enum: UserRole,
        default: UserRole.User,
    })
    public role: UserRole;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);