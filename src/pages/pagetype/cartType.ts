export interface AuthorCart {
  id: number;
  name: string;
}

export interface CategoryCart {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  title: string;
  coverImage: string;
  author: AuthorCart;
  category: CategoryCart;
}

export interface CartItem {
  id: number;
  bookId: number;
  addedAt: string;
  book: Book;
}

export interface CartDataResponse {
  cartId: number;
  items: CartItem[];
  itemCount: number;
}