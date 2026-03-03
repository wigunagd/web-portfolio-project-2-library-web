import { useInfiniteQuery } from "@tanstack/react-query";
import type { BookQueryParams, BookResponseData } from "../pagetype/bookType";
import type { AxiosError } from "axios";
import { getBookInCategory } from "./apiCategory";

export const useGetBookInCategoty = (params: BookQueryParams) => {
    return useInfiniteQuery<BookResponseData, AxiosError>({
        initialPageParam: 1,
        queryKey: ['category', params],
        queryFn: ({ pageParam }) => getBookInCategory({ ...params, page: pageParam as number }),
        getNextPageParam: (responseData) => {
            return (responseData.pagination.page < responseData.pagination.totalPages) ? responseData.pagination.page + 1 : undefined;
        }
    });
}