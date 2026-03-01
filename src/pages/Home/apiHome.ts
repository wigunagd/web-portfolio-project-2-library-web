import { apiAxios } from "@/lib/apiAxios";
import type { BookQueryParams } from "./homeType";

export const getRecommend = async ({ by, page, limit }: BookQueryParams) => {
    const response = await apiAxios.get("/api/books/recommend", {
        params: {
            by: by,
            page: page,
            limit: limit
        }
    });

    return response.data.data;
}

export const getAuthor = async ({ limit }: { limit: number }) => {
    const response = await apiAxios.get("/api/authors/popular", {
        params: {
            limit: limit
        }
    });

    return response.data.data;
}