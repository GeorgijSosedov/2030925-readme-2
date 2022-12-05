import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CRUDRepository } from "@readme/core";
import { User } from "@readme/shared-types";
import { Model } from "mongoose";
import { BlogUserEntity } from "./blog-user.entity.js";
import { BlogUserModel } from "./blog-user.model.js";

@Injectable()
export class BlogUserRepository implements CRUDRepository<BlogUserEntity,string,User> {
    constructor(
        @InjectModel(BlogUserModel.name) private readonly blogUserModel: Model<BlogUserModel>
    ) {}

    public async create(item: BlogUserEntity): Promise<User> {
        const newBlogUser = new this.blogUserModel(item);
        return newBlogUser.save();
    }

    public async destroy(id: string): Promise<void> {
        this.blogUserModel.deleteOne({id});
    }

    public async findById(id: string): Promise<User | null> {
        return this.blogUserModel
        .findOne({id})
        .exec();
    }

    public async findByMail(mail: string): Promise<User | null> {
        return this.blogUserModel
        .findOne({mail})
        .exec();
    }

    public async update(id: string, item: BlogUserEntity): Promise<User> {
        return this.blogUserModel
        .findByIdAndUpdate(id,item.toObject(), {new: true})
        .exec();
    }
}