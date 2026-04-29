import { AxiosError } from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { BorrowedQueryParams, LoanResponse } from "./borrowedType";
import { getBorrowed } from "./apiBorrowed";

export const useGetBorrowed = (params: BorrowedQueryParams) => {
    return useInfiniteQuery<LoanResponse, AxiosError>({
        initialPageParam: 1,
        queryKey: ['loans', params],
        queryFn: ({ pageParam }) => getBorrowed({ ...params, page: pageParam as number }),
        getNextPageParam: (responseData) => {
            return (responseData.data.pagination.page < responseData.data.pagination.totalPages) ? responseData.data.pagination.page + 1 : undefined;
        }
    });
}