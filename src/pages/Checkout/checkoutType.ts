export interface CheckoutRequestBody {
    itemIds: number[],
    days: number,
    borrowDate: string
}