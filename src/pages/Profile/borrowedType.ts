export interface BorrowedQueryParams {
  page?: number;
  limit?: number;
}

export interface Book {
  id: number;
  title: string;
  coverImage: string;
}

export type LoanStatus = 'BORROWED' | 'RETURNED' | 'OVERDUE';

export interface Loan {
  id: number;
  userId: number;
  bookId: number;
  status: LoanStatus;
  borrowedAt: string; 
  dueAt: string; 
  returnedAt: string | null;
  book: Book;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface LoanData {
  loans: Loan[];
  pagination: Pagination;
}

export interface LoanResponse {
  success: boolean;
  message: string;
  data: LoanData;
}