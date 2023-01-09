import { Injectable } from "@nestjs/common";
import { Category, CRUDRepository } from "@readme/core";
import { PrismaService } from "../prisma/prisma.service";
import { BlogCategoryEntity } from "./blog-category.entity";

@Injectable()
export class BlogCategoryRepository implements CRUDRepository<BlogCategoryEntity, number, Category> {
    constructor(private readonly prisma: PrismaService) {}

    public async create(item: BlogCategoryEntity): Promise<Category> {
        return this.prisma.category.create({
            data: { ...item.toObject() }
        });
    }

    public async destroy(id: number): Promise<void> {
        return this.prisma.category.delete ({
            where: {
                id,
            }
        });
    }

    public findById(id: number): Promise<Category | null> {
        return this.prisma.category.findFirst({
            where: {
                id,
            }
        });
    }

    public find(ids: number[] = []): Promise<Category[]> {
        return this.prisma.category.findMany({
            where: {
                id: {
                    in: ids.length > 0 ? ids : undefined
                }
            }
        });
    }

    public update(id: number, item: BlogCategoryEntity): Promise<Category> {
        return this.prisma.category.update({
            where: {
                id
            },
            data: { ...item.toObject(), id }
        });
    }
}