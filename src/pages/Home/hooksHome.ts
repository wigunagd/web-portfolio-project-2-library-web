import { AxiosError } from "axios";
import type { AuthorResponseData, BookQueryParams, BookResponseData } from "../pagetype/bookType";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAuthor, getRecommend } from "./apiHome";

export const useGetRecommend = (params: BookQueryParams) => {
    return useInfiniteQuery<BookResponseData, AxiosError>({
        initialPageParam: 1,
        queryKey: ['recomend', params],
        queryFn: ({ pageParam }) => getRecommend({ ...params, page: pageParam as number }),
        getNextPageParam: (responseData) => {
            return (responseData.pagination.page < responseData.pagination.totalPages) ? responseData.pagination.page + 1 : undefined;
        }
    });
}

export const useGetAuthor = (params: { limit: number }) => {
    return useQuery<AuthorResponseData, AxiosError>({
        queryKey: ['author', params],
        queryFn: () => getAuthor(params),
    });
}