import { Module } from "@nestjs/common";
import { BlogCategoryController } from "./blog-category.controller";
import { BlogCategoryRepository } from "./blog-category.repository";
import { BlogCategoryService } from "./blog-category.service";

@Module({
    imports: [],
    controllers: [BlogCategoryController],
    providers: [BlogCategoryService,BlogCategoryRepository],
    exports: [BlogCategoryRepository]
})
export class BlogCategoryModule {}