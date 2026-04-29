import { apiAxios } from "@/lib/apiAxios";
import type { BorrowedQueryAdminParams } from "./borrowedListAdmintype";

export const getBorrowedAdmin = async ({  status, q, page, limit }: BorrowedQueryAdminParams) => {
    const response = await apiAxios.get("/api/admin/loans", {
        params: {
            status: status,
            q: q,
            page: page,
            limit: limit
        }
    });

    return response.data;
}