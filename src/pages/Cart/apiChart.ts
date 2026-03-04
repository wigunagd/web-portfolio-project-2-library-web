import { apiAxios } from "@/lib/apiAxios";

export const getChartData = async () => {
    const response = await apiAxios.get("/api/cart");

    return response.data.data;
}

export const delChartData = async (itemId: number) => {
    const response = await apiAxios.delete(`/api/cart/items/${itemId}`);

    return response.data.data;
}