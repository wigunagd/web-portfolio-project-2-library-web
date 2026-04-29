export interface BorrowedQueryAdminParams {
  page?: number;
  limit?: number;
  status?: string;
  q?: string;
}

export type LoanStatus = 'BORROWED' | 'RETURNED';

export interface Author {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface LoanBook {
  id: number;
  title: string;
  coverImage: string;
  author: Author;
  category: Category;
}

export interface Borrower {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface LoanAdmin {
  id: number;
  status: LoanStatus;
  displayStatus: string; 
  borrowedAt: string;
  dueAt: string;      
  returnedAt: string | null;
  durationDays: number;
  book: LoanBook;
  borrower: Borrower;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetLoansData {
  loans: LoanAdmin[];
  pagination: Pagination;
}

export interface LoanAdminResponse {
  success: boolean;
  message: string;
  data: GetLoansData;
}