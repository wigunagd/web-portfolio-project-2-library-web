export interface BookQueryParams {
  by?: 'rating' | 'popularity';
  categoryId?: number;
  page?: number;
  limit?: number;
}

// ---------------

interface Author {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  title: string;
  description: string;
  isbn: string;
  publishedYear: number;
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

export interface BooksPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BookResponseData {
  mode: string;
  books: Book[];
  pagination: BooksPagination;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: BookResponseData;
}