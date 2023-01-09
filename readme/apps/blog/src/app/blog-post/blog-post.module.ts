import { Module } from "@nestjs/common";
import { BlogCategoryModule } from "../blog-category/blog-category.module";
import { BlogPostController } from "./blog-post.controller";
import { BlogPostRepository } from "./blog-post.repository";
import { BlogPostService } from "./blog-post.service";

@Module({
    imports: [BlogCategoryModule],
    controllers: [BlogPostController],
    providers: [BlogPostService, BlogPostRepository]
})
export class BlogPostModule {}
