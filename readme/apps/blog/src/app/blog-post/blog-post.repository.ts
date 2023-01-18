import { Injectable } from "@nestjs/common";
import { CRUDRepository, Post } from "@readme/core";
import { PrismaService } from "../prisma/prisma.service";
import { BlogPostEntity } from "./blog-post.entity";
import { PostQuery } from "./query/post.query";

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

    public async find({limit,categories,sortDirection,page}: PostQuery): Promise<Post[]> {
        return this.prisma.post.findMany({
            where: {
                categories: {
                  some: {
                    id: {
                      in: categories
                    }
                  }
                }
              },
              take: limit,
        include: {
            comments: true,
            categories: true,
        },
        orderBy: [
            {
              createdAt: sortDirection
            }
          ],
          skip: page > 0 ? limit * (page - 1) : undefined,
        });
    }

    public async update(id: number, item: BlogPostEntity): Promise<Post> {
        return Promise.resolve(undefined);
    }
}
