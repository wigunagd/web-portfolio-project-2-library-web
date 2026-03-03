import type { AxiosError } from "axios";
import type { AuthorParams, AuthorResponse } from "./authorPageType";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAuthorData } from "./apiAuthor";

export const useGetAuthorData = (params: AuthorParams) => {
    return useQuery<AuthorResponse, AxiosError>({
        queryKey: ['author', params],
        queryFn: () => getAuthorData(params),
    });
}

export const useGetAuthorBooksData = (params: AuthorParams) => {
    return useInfiniteQuery<AuthorResponse, AxiosError>({
        initialPageParam: 1,
        queryKey: ['authorBooks', params],
        queryFn: ({ pageParam }) => getAuthorData({ ...params, page: pageParam as number }),
        getNextPageParam: (responseData) => {
            return (responseData.pagination.page < responseData.pagination.totalPages) ? responseData.pagination.page + 1 : undefined;
        }
    });
}