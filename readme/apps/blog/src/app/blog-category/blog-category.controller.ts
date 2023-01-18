import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Query } from "@nestjs/common";
import { fillObject } from "@readme/core";
import { brotliDecompress } from "zlib";
import { PostQuery } from "../blog-post/query/post.query";
import { BlogCategoryService } from "./blog-category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { CategoryRdo } from "./rdo/category.rdo";

@Controller('categories')
export class BlogCategoryController {
    constructor(
        private readonly blogCategoryService: BlogCategoryService
    ) {}

    @Get('/:id')
    async show(@Param('id') id: number) {
        const existCategory = await this.blogCategoryService.getCategory(id);
        return fillObject(CategoryRdo, existCategory);
    }

    @Get('/')
    async index() {
        const categorites = await this.blogCategoryService.getCategories();
        return fillObject(CategoryRdo, categorites);
    }

    @Get('/')
    async create(@Body() dto: CreateCategoryDto) {
        const newCategory = await this.blogCategoryService.createCategory(dto);
        return fillObject(CategoryRdo, newCategory);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id') id: number) {
        this.blogCategoryService.deleteCategory(id);
    }

    @Patch('/:id')
    async update(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
        const updatedCategory = await this.blogCategoryService.updateCategory(id, dto);
        return fillObject(CategoryRdo, updatedCategory);
    }
}