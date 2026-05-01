import type { AxiosError } from "axios";
import type { AddBookAdminResponse, GetAuthorsResponse, GetCategoriesResponse, QueryAuthorParams } from "./addEditBooktype";
import { useMutation, useQuery } from "@tanstack/react-query";
import {  doAddBookAdmin, getAuthorsAdmin, getCategories } from "./apiAddEditBook";

export const useGetCategories = () => {
    return useQuery<GetCategoriesResponse, AxiosError>({
        queryKey: ['categorybook'],
        queryFn: () => getCategories(),
    });
}

export const useGetAuthorsAdmin = (params: QueryAuthorParams) => {
    return useQuery<GetAuthorsResponse, AxiosError>({
        queryKey: ['bookauthors', params],
        queryFn: () => getAuthorsAdmin(params)
    });
}

export const useDoAddBookAdmin = () => {
    return useMutation<AddBookAdminResponse, AxiosError, FormData>({
        mutationFn: (body) => doAddBookAdmin(body)
    })
}