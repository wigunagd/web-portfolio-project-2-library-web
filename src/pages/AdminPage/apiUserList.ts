import { apiAxios } from "@/lib/apiAxios";
import type { UserQueryParams } from "./userListType";

export const getUserList = async ({ q, page, limit }: UserQueryParams) => {
    const response = await apiAxios.get("/api/admin/users", {
        params: {
            q: q,
            page: page,
            limit: limit
        }
    });

    return response.data;
}