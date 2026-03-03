import { useQuery } from "@tanstack/react-query";
import type { Book, BookQueryParams, BookResponseData } from "../pagetype/bookType";
import type { AxiosError } from "axios";
import { getDetailBook, getRelatedBook } from "./apiDetailBook";

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