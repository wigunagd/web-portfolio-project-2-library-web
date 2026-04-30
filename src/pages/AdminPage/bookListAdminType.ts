export interface BookListQueryAdminParams {
  page?: number;
  limit?: number;
  status?: string;
  q?: string;
}

interface Author {
  id: number;
  name: string;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookListAdminType {
  id: number;
  title: string;
  description: string | null;
  isbn: string;
  publishedYear: number | null;
  coverImage: string;
  rating: number;
  reviewCount: number;
  totalCopies: number;
  availableCopies: number;
  borrowCount: number;
  authorId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
  category: Category;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface BooksResponseData {
  books: BookListAdminType[];
  pagination: Pagination;
}

export interface BookListAdminResponse {
  success: boolean;
  message: string;
  data: BooksResponseData;
}

export interface DeleteBookResponse {
  success: false,
  message: string
}