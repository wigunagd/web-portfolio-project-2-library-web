import { apiAxios } from "@/lib/apiAxios";
import type { QueryAuthorParams } from "./addEditBooktype";

export const getCategories = async () => {
    const response = await apiAxios.get("/api/categories");
    return response.data;
}

export const getAuthorsAdmin = async ({ q }: QueryAuthorParams) => {
    const response = await apiAxios.get("/api/authors", {
        params: {
            q: q
        }
    });

    return response.data;
}

export const doAddBookAdmin = async (formdata: FormData) => {
    const response = await apiAxios.post("/api/books", formdata);
    return response.data;
}