import type { Book } from "../pagetype/bookType";

export interface AuthorParams {
    id: number;
    page: number;
    limit: number;
}

interface Author {
    id: number;
    name: string;
    bio: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CategoryAuthor {
    id: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PaginationAuthor {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface AuthorResponse {
    author: Author;
    bookCount: number;
    books: Book[];
    pagination: PaginationAuthor;
}