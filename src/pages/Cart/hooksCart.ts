import { useMutation, useQuery } from "@tanstack/react-query";
import type { CartDataResponse } from "../pagetype/cartType";
import type { AxiosError } from "axios";
import { delChartData, getChartData } from "./apiChart";
import type { RequestResponse } from "@/lib/requestResponseType";

export const useGetChartData = () => {
    return useQuery<CartDataResponse, AxiosError>({
        queryKey: ['cart'],
        queryFn: () => getChartData(),
    });
}

export const useDelChartData = () => {
    return useMutation<RequestResponse, AxiosError, number>({
        mutationFn: (id: number) => delChartData(id)
    });
}