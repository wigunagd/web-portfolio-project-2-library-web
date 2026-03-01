import { useQuery } from "@tanstack/react-query";
import type { Book } from "../pagetype/bookType";
import type { AxiosError } from "axios";
import { getDetailBook } from "./apiDetailBook";

export const useGetDetailBook = (id: number ) => {
    return useQuery<Book, AxiosError>({
        queryKey: ['book', id],
        queryFn: () => getDetailBook(id),
    });
}