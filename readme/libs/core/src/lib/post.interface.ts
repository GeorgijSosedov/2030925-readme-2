import { Category } from "./category.interface";
import { Comment } from "./comment.interface";

export interface Post {
    id?: number;
    title: string;
    categories: Category[];
    announceText: string;
    text: string;
    publishedAt?: Date;
    createdAt?: Date;
    userId: string;
    comments: Comment[];
}