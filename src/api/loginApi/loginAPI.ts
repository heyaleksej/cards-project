import axios from 'axios';
import {ProfileType} from "../../main/pages/Profile/profileReducer";
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