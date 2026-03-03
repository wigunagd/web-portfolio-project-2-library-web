import { apiAxios } from "@/lib/apiAxios";

export const getChartData = async () => {
    const response = await apiAxios.get("/api/cart");

    return response.data.data;
}