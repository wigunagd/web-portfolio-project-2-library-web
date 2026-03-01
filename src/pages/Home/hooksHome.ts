import { AxiosError } from "axios";
import type { BookQueryParams, BookResponseData } from "./homeType";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getRecommend } from "./apiHome";

export const useGetRecommend = (params: BookQueryParams) =>{
    return useInfiniteQuery<BookResponseData, AxiosError>({
        initialPageParam: 1,
        queryKey: ['recomend', params],
        queryFn: ({pageParam}) => getRecommend({...params, page: pageParam as number}),
        getNextPageParam: (responseData) => {
            console.log(responseData, 'responseData')
            return (responseData.pagination.page<responseData.pagination.totalPages) ? responseData.pagination.page + 1 : undefined;
        }
    });
}