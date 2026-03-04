import { apiAxios } from "@/lib/apiAxios";
import type { CheckoutRequestBody } from "./checkoutType1";

export const getCheckoutData = async () => {
    const response = await apiAxios.get("/api/cart/checkout");
    return response.data.data;
}

export const doCheckout = async ({ itemIds, days, borrowDate }: CheckoutRequestBody) => {
    const response = await apiAxios.post("/api/loans/from-cart", {
        itemIds: itemIds, 
        days: days, 
        borrowDate: borrowDate
    });

    return response.data;
}

