import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch } from "@nestjs/common";
import { fillObject } from "@readme/core";
import { brotliDecompress } from "zlib";
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
    async show(@Param('id') id: string) {
        const categoryId = parseInt(id,10);
        const existCategory = await this.blogCategoryService.getCategory(categoryId);
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
    async destroy(@Param('id') id: string) {
        const categoryId = parseInt(id,10);
        this.blogCategoryService.deleteCategory(categoryId);
    }

    @Patch('/:id')
    async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
        const categoryId = parseInt(id,10);
        const updatedCategory = await this.blogCategoryService.updateCategory(categoryId, dto);
        return fillObject(CategoryRdo, updatedCategory);
    }
}