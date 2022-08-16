import {instance} from "../instance/instance";
import {ProfileType} from "../../main/pages/profile/profileReducer";

export const profileAPI = {

    updateProfile(name: string, avatar?: string) {
        return instance.put<UpdateResponseType>('auth/me', {name, avatar}).then(response => response.data)
    },

    logOut() {
        return instance.delete('auth/me').then(response => response.data)
    }
}

export type dataType = {
    name?: string | null
    userAvatar?: File | null

}

type UpdateResponseType = {
    token: string
    tokenDeathTime: number
    updatedUser: ProfileType
}


