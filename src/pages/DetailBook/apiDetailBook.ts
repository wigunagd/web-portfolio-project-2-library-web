import { apiAxios } from "@/lib/apiAxios";
import type { BookQueryParams } from "../pagetype/bookType";

export const getDetailBook = async (id: number) => {
    const response = await apiAxios.get(`/api/books/${id}`);
    return response.data.data;
}

export const getRelatedBook = async ({ by, categoryId, limit }: BookQueryParams) => {
    const response = await apiAxios.get("/api/books/recommend", {
        params: {
            by: by,
            categoryId: categoryId,
            limit: limit
        }
    });

    return response.data.data;
}