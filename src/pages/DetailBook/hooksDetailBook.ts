import { useMutation, useQuery } from "@tanstack/react-query";
import type { Book, BookQueryParams, BookResponseData } from "../pagetype/bookType";
import type { AxiosError } from "axios";
import { addToCart, getDetailBook, getRelatedBook } from "./apiDetailBook";
import type { RequestResponse } from "@/lib/requestResponseType";
import type { AddTOCartType } from "./addToCarttype";

export const useGetDetailBook = (id: number ) => {
    return useQuery<Book, AxiosError>({
        queryKey: ['book', id],
        queryFn: () => getDetailBook(id),
    });
}

export const useGetRelatedBook = (params: BookQueryParams) => {
    return useQuery<BookResponseData, AxiosError>({
        queryKey: ['relatedbook', params],
        queryFn: () => getRelatedBook(params),
    });
}

export const useAddToCart = () => {
    return useMutation<RequestResponse, AxiosError, AddTOCartType>({
        mutationFn: (body) => addToCart(body),
    });
};