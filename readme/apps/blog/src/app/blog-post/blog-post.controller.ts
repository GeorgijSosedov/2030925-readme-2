import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from "@nestjs/common";
import { fillObject } from "@readme/core";
import { UpdateCategoryDto } from "../blog-category/dto/update-category.dto";
import { BlogPostService } from "./blog-post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostQuery } from "./query/post.query";
import { PostRdo } from "./rdo/blog-post.rdo";

@Controller('posts')
export class BlogPostController {
    constructor(
        private readonly blogPostService: BlogPostService
    ) {}

    @Get('/:id')
    async show(@Param('id') id: number) {
      const post = await this.blogPostService.getPost(id);
      return fillObject(PostRdo, post);
    }
  
    @Get('/')
    async index(@Query () query: PostQuery) {
      const posts = await this.blogPostService.getPosts(query);
      return fillObject(PostRdo, posts);
    }
  
    @Post('/')
    async create(@Body() dto: CreatePostDto) {
      const newPost = await this.blogPostService.createPost(dto);
      return fillObject(PostRdo, newPost);
    }
  
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id') id: number) {
      this.blogPostService.deletePost(id);
    }
  
    @Patch('/:id')
    async update(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
      const updatedPost = await this.blogPostService.updatePost(id, dto);
      return fillObject(PostRdo, updatedPost)
    }
  }
