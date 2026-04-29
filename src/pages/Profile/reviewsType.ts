/* Review */
export interface ReviewQueryParams {
  q?: string;
  page?: number;
  limit?: number;
}

export interface ReviewBody{
  bookId: number;
  star: number;
  comment: string;
}

export interface Review {
  id: number;
  star: number;
  comment: string;
  userId: number;
  bookId: number;
  createdAt: string;
}

export interface BookStats {
  rating: number;
  reviewCount: number;
}

export interface SaveReviewData {
  review: Review;
  bookStats: BookStats;
}

export interface SaveReviewResponse {
  success: boolean;
  message: string;
  data: SaveReviewData;
}
/* Review */

export interface Author {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface BookDetail {
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

export interface ReviewItem {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  book: BookDetail;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetReviewsData {
  reviews: ReviewItem[];
  pagination: Pagination;
}

export interface GetReviewsResponse {
  success: boolean;
  message: string;
  data: GetReviewsData;
}