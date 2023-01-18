import { Transform } from "class-transformer";
import { IsArray, IsIn, IsNumber, IsOptional, ValidationError } from "class-validator";
import { DEFAULT_POST_COUNT_LIMIT } from "../blog-post.constant";

export class PostQuery {
    @Transform(({ value } ) => +value || DEFAULT_POST_COUNT_LIMIT)
    @IsNumber()
    @IsOptional()
    public limit = DEFAULT_POST_COUNT_LIMIT;

    @Transform(({value}) => value.split(',').map((categoryId) => +categoryId))
    @IsArray()
    @IsOptional()
    public categories?: number;

    @IsIn(['asc', 'desc'])
    @IsOptional()
    public sortDirection?: number;

    @Transform(({ value }) => +value)
    @IsOptional()
    public page: number;
}