export interface UserQueryParams {
  q?: string;
  page?: number;
  limit?: number;
}

export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  profilePhoto: string | null;
  role: UserRole;
  createdAt: string; // ISO Date String
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetUsersData {
  users: User[];
  pagination: Pagination;
}

export interface GetUsersResponse {
  success: boolean;
  message: string;
  data: GetUsersData;
}