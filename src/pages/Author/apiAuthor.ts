import { apiAxios } from "@/lib/apiAxios";
import type { AuthorParams } from "./authorPageType";

export const getAuthorData = async ({ id, page, limit }: AuthorParams) => {
    const response = await apiAxios.get(`/api/authors/${id}/books`, {
        params: {
            page: page,
            limit: limit
        }
    });

    return response.data.data;
}