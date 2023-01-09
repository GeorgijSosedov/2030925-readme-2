import { Injectable } from "@nestjs/common";
import { CRUDRepository, Post } from "@readme/core";
import { PrismaService } from "../prisma/prisma.service";
import { BlogPostEntity } from "./blog-post.entity";

@Injectable()
export class BlogPostRepository implements CRUDRepository<BlogPostEntity, number , Post> {
    constructor(private readonly prisma: PrismaService) {}

    public async create(item: BlogPostEntity): Promise<Post> {
        const entityData = item.toObject();
        return this.prisma.post.create({
            data: {
                ...entityData,
            categories: {
                connect: [...entityData.categories]
            },
            comments: {
                connect: []
            }
            },
            include: {
                comments: true,
                categories: true
            }
        });
    }
    public async destroy(id: number): Promise<void> {
        await this.prisma.post.delete({
            where: {
                id
            }
        });
    }

    public async findById(id: number): Promise<Post> {
        return this.prisma.post.findFirst({
            where: {
                id
            },
            include: {
                comments: true,
                categories: true
            }
        });
    }

    public async find(): Promise<Post[]> {
        return this.prisma.post.findMany({
            include: {
                comments: true,
                categories: true
            }
        });
    }

    public async update(id: number, item: BlogPostEntity): Promise<Post> {
        return Promise.resolve(undefined);
    }
}
