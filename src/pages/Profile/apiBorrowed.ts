import { apiAxios } from "@/lib/apiAxios";
import type { BorrowedQueryParams, ReviewBody } from "./borrowedType";

export const getBorrowed = async ({  page, limit }: BorrowedQueryParams) => {
    const response = await apiAxios.get("/api/me/loans", {
        params: {
            page: page,
            limit: limit
        }
    });

    return response.data;
}

export const sendReview = async ({ bookId, star, comment }: ReviewBody) => {
    const response = await apiAxios.post("/api/reviews", {
        bookId: bookId, 
        star: star, 
        comment: comment
    });

    return response.data;
}