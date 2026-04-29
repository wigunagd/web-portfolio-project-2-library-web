import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { GetReviewsResponse, ReviewBody, ReviewQueryParams, SaveReviewResponse } from "./reviewsType";
import { getReview, sendReview } from "./apiReviews";

export const useSendReview = () => {
    const queryClient = useQueryClient();
    return useMutation<SaveReviewResponse, AxiosError, ReviewBody>({
        mutationFn: (body) => sendReview(body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['myreviews']
            });
        },
        onError: () => {
        }

        // on success dan on error dipass ke LoginPage.tsx
    });
};

export const useGetReview = (params: ReviewQueryParams) => {
    return useInfiniteQuery<GetReviewsResponse, AxiosError>({
        initialPageParam:1,
        queryKey: ['myreviews', params],
        queryFn: ({pageParam}) => getReview({...params, page: pageParam as number}),
        getNextPageParam: (responseData) => {
            return (responseData.data.pagination.page < responseData.data.pagination.totalPages) ? responseData.data.pagination.page + 1 : undefined;
        }
    });
}