import { apiAxios } from "@/lib/apiAxios";
import type { BorrowedQueryParams } from "./borrowedType";

export const getBorrowed = async ({  page, limit }: BorrowedQueryParams) => {
    const response = await apiAxios.get("/api/me/loans", {
        params: {
            page: page,
            limit: limit
        }
    });

    return response.data;
}