import { AxiosError } from "axios";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { BookListAdminResponse, BookListQueryAdminParams, DeleteBookResponse } from "./bookListAdminType";
import { deleteBookAdmin, getBookListAdmin } from "./apiBookListAdmin";

export const useGetBookListAdmin = (params: BookListQueryAdminParams) => {
    return useInfiniteQuery<BookListAdminResponse, AxiosError>({
        initialPageParam: 1,
        queryKey: ['bookListAdmin', params],
        queryFn: ({ pageParam }) => getBookListAdmin({ ...params, page: pageParam as number }),
        getNextPageParam: (responseData) => {
            return (responseData.data.pagination.page < responseData.data.pagination.totalPages) ? responseData.data.pagination.page + 1 : undefined;
        }
    });
}

export const useDeleteBookAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation<DeleteBookResponse, AxiosError, number>({
        mutationFn: (id: number) => deleteBookAdmin(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['bookListAdmin']
            });
        },
        onError: () => {
        }
    });
};