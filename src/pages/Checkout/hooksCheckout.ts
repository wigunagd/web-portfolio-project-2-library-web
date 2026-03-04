import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { CartDataResponse } from "../pagetype/cartType";
import { doCheckout, getCheckoutData } from "./apiCheckout";
import type { RequestResponse } from "@/lib/requestResponseType";
import type { CheckoutRequestBody } from "./checkoutType1";

export const useGetCheckoutData = () => {
    return useQuery<CartDataResponse, AxiosError>({
        queryKey: ['cart'],
        queryFn: () => getCheckoutData(),
    });
}

export const useDoCheckout = () => {
    return useMutation<RequestResponse, AxiosError, CheckoutRequestBody>({
        mutationFn: (body) => doCheckout(body),
    });
};