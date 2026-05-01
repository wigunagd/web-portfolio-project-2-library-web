import { apiAxios } from "@/lib/apiAxios";
import type { BorrowedQueryParams } from "./borrowedType";

export const getBorrowed = async ({ status, page, limit }: BorrowedQueryParams) => {
    const response = await apiAxios.get("/api/me/loans", {
        params: {
            status: status,
            page: page,
            limit: limit
        }
    });

    return response.data;
}