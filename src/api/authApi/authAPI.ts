import {instance} from "../instance/instance";
import {AxiosResponse} from "axios";

export const authApi = {
    me() {
        return instance.post('auth/me');
    },
    forgotPassword(data: ForgotPasswordPayloadType) {
        return instance.post<any, AxiosResponse<ResponseType>, ForgotPasswordPayloadType>(`auth/forgot`, data);
    },
    updatePassword(data: UpdatePasswordPayloadType) {
        return instance.post<any, AxiosResponse<ResponseType>, UpdatePasswordPayloadType>(`auth/set-new-password`, data);
    },
}

//types
export type ForgotPasswordPayloadType = {
    email: string
    from: string
    message: string
}

export type UpdatePasswordPayloadType = {
    password: string
    resetPasswordToken: string
}
