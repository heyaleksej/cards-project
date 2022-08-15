import {instance} from "../instance/instance";
import {AxiosResponse} from "axios";

export const registrationApi = {
    registrationRequest(data: RegistrationPayloadType) {
        return instance.post<any, AxiosResponse<RegistrationResponseType>, RegistrationPayloadType>('auth/register', data);
    },
}

type RegistrationPayloadType = {
    email: string,
    password: string
}

type RegistrationResponseType = {
    addedUser: {
        _id: string,
        email: string,
        rememberMe: boolean,
        isAdmin: boolean,
        name: string,
        verified: boolean,
        publicCardPacksCount: number,
        created: string,
        updated: string,
        __v: number
    },
    error?: string,
}
