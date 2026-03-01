import { apiAxios } from "@/lib/apiAxios";

export const getDetailBook = async (id: number) => {
    const response = await apiAxios.get(`/api/books/${id}`);
    return response.data.data;
}