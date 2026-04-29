import { AxiosError } from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { BorrowedQueryAdminParams, LoanAdminResponse } from "./borrowedListAdmintype";
import { getBorrowedAdmin } from "./apiBorrowedListAdmin";

export const useGetBorrowedAdmin = (params: BorrowedQueryAdminParams) => {
    return useInfiniteQuery<LoanAdminResponse, AxiosError>({
        initialPageParam: 1,
        queryKey: ['borrowedAdmin', params],
        queryFn: ({ pageParam }) => getBorrowedAdmin({ ...params, page: pageParam as number }),
        getNextPageParam: (responseData) => {
            return (responseData.data.pagination.page < responseData.data.pagination.totalPages) ? responseData.data.pagination.page + 1 : undefined;
        }
    });
}