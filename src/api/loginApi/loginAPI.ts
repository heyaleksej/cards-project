import {ProfileType} from "../../main/pages/profile/profileReducer";
import { instance } from '../instance/instance';


export const loginApi = {
    loginRequest(data: LoginPayloadType) {
        return instance.post<ProfileType>('auth/login', data);
    },
}

//types

export type LoginPayloadType = {
    email: string
    password: string
    rememberMe: boolean
}