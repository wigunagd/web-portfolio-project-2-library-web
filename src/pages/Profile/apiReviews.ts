import { apiAxios } from "@/lib/apiAxios";
import type { ReviewBody, ReviewQueryParams } from "./reviewsType";

export const sendReview = async ({ bookId, star, comment }: ReviewBody) => {
    const response = await apiAxios.post("/api/reviews", {
        bookId: bookId,
        star: star,
        comment: comment
    });

    return response.data;
}

export const getReview = async ({ q, page, limit }: ReviewQueryParams) => {
    const response = await apiAxios.get("/api/me/reviews", {
        params: {
            q: q,
            page: page,
            limit: limit
        }
    });

    return response.data;
}