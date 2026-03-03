import { useQuery } from "@tanstack/react-query";
import type { CartDataResponse } from "../pagetype/cartType";
import type { AxiosError } from "axios";
import { getChartData } from "./apiChart";

export const useGetChartData = () => {
    return useQuery<CartDataResponse, AxiosError>({
        queryKey: ['cart'],
        queryFn: () => getChartData(),
    });
}