import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { IRegisterBody, IRegisterResponse } from "./authType";
import { registerApi } from "./apiRegister";


export const useRegister = () => {

    return useMutation<IRegisterResponse, AxiosError, IRegisterBody>({
        mutationFn: (body) => registerApi(body),
    });
};