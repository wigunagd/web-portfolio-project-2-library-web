import { apiAxios } from "@/lib/apiAxios";
import type { BookQueryParams } from "../pagetype/bookType";

export const getBookInCategory = async ({ page, limit }: BookQueryParams) => {
    const response = await apiAxios.get("/api/books", {
        params: {
            page: page,
            limit: limit
        }
    });

    return response.data.data;
}