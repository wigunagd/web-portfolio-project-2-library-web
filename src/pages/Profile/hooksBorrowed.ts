import { AxiosError } from "axios";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import type { BorrowedQueryParams, LoanResponse, ReviewBody, SaveReviewResponse } from "./borrowedType";
import { getBorrowed, sendReview } from "./apiBorrowed";

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

export const useSendReview = () => {
    return useMutation<SaveReviewResponse, AxiosError, ReviewBody>({
        mutationFn: (body) => sendReview(body),
        onSuccess: () => {
            //console.log(data, 'aaaa')
        },
        onError: () => {
        }

        // on success dan on error dipass ke LoginPage.tsx
    });
};