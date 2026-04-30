import { apiAxios } from "@/lib/apiAxios";
import type { BookListQueryAdminParams } from "./bookListAdminType";

export const getBookListAdmin = async ({  status, q, page, limit }: BookListQueryAdminParams) => {
    const response = await apiAxios.get("/api/admin/books", {
        params: {
            status: status,
            q: q,
            page: page,
            limit: limit
        }
    });

    return response.data;
}

export const deleteBookAdmin = async (id: number) => {
    const response = await apiAxios.delete(`/api/books/${id}`);

    return response.data;
}