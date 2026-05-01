/* category */
export interface CategoryBookAdmin {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface GetCategoriesResponseData {
  categories: CategoryBookAdmin[];
}

export interface GetCategoriesResponse {
  success: boolean;
  message: string;
  data: GetCategoriesResponseData;
}
/* category */

/* author */
export interface QueryAuthorParams {
  q?: string;
}

export interface Author {
  id: number;
  name: string;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetAuthorsResponseData {
  authors: Author[];
}

export interface GetAuthorsResponse {
  success: boolean;
  message: string;
  data: GetAuthorsResponseData;
}

export interface AddBookAdminResponse{
  success: boolean;
  message: string;
}
/* author */