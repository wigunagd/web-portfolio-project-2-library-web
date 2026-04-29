import {useQuery } from "@tanstack/react-query";
import type { GetUsersResponse, UserQueryParams } from "./userListType";
import type { AxiosError } from "axios";
import { getUserList } from "./apiUserList";

export const useGetUserList = (params: UserQueryParams) => {
    return useQuery<GetUsersResponse, AxiosError>({
        queryKey: ['userlist', params],
        queryFn: ({pageParam}) => getUserList({...params, page: pageParam as number})
    });
}