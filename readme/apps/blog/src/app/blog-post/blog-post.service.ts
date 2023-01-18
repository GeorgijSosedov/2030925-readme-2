import { Injectable } from "@nestjs/common";
import { Post } from "@readme/core";
import { BlogCategoryRepository } from "../blog-category/blog-category.repository";
import { BlogPostEntity } from "./blog-post.entity";
import { BlogPostRepository } from "./blog-post.repository";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostQuery } from "./query/post.query";

@Injectable()
export class BlogPostService {
    constructor(
        private readonly blogPostRepository: BlogPostRepository,
        private readonly blogCategoryRepository: BlogCategoryRepository
      ) {}
    
      async createPost(dto: CreatePostDto): Promise<Post> {
        const categories = await this.blogCategoryRepository.find(dto.categories);
        const postEntity = new BlogPostEntity({ ...dto, categories, comments: [] });
        return this.blogPostRepository.create(postEntity);
      }
    
      async deletePost(id: number): Promise<void> {
        this.blogPostRepository.destroy(id);
      }
    
      async getPost(id: number): Promise<Post> {
        return this.blogPostRepository.findById(id);
      }
    
      async getPosts(query: PostQuery): Promise<Post[]> {
        return this.blogPostRepository.find(query)
      }	  
    
      async updatePost(id: number, dto: UpdatePostDto): Promise<Post> {
        throw new Error('Not implemented…');
      }
    
    }