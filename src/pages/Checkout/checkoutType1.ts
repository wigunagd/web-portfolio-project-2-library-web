export interface CheckoutRequestBody {
    itemIds: number[],
    days: number,
    borrowDate: string
}

export interface Loan {
  id: number;
  userId: number;
  bookId: number;
  status: "BORROWED" | "RETURNED" | "OVERDUE"; 
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
  returnByMessage: string;
}

export interface BorrowData {
  loans: Loan[];
  failed: string[];
  removedFromCart: number;
  message: string;
}

export interface BorrowResponse {
  success: boolean;
  message: string;
  data: BorrowData;
}