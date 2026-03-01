import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ILoginBody, ILoginResponse } from "./authType";
import { loginApi } from "./apiLogin";


export const useLogin = () => {
    return useMutation<ILoginResponse, AxiosError, ILoginBody>({
        mutationFn: (body) => loginApi(body),
        onSuccess: () => {
            //console.log(data, 'aaaa')
        },
        onError: () => {
        }

        // on success dan on error dipass ke LoginPage.tsx
    });
};