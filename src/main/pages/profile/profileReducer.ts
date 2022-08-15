import {Dispatch} from 'redux';
import {authApi} from "../../../api/authApi/authAPI";
import {profileAPI} from '../../../api/profileApi/profileAPI';
import {isLoginAC} from "../login/loginReducer";
import {AxiosError} from "axios";
import {getStatusAC, RequestStatusType, setAppErrorAC} from "../../../app/app-reducer";
import {AppThunk} from "../../../app/store";


const initialState: ProfileInitialStateType = {
    profile: {
        _id: null,
        email: null,
        name: null,
        avatar: null,
        publicCardPacksCount: null,
        created: null,
        updated: null,
        isAdmin: null,
        verified: null,
        rememberMe: null,
        error: null
    },
    myId: null,
    error: null,
    status: 'idle'
}

export const profileReducer = (state: ProfileInitialStateType = initialState, action: ProfileActionsType): ProfileInitialStateType => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        case SET_NEW_USER_NAME: {
            return {
                ...state,
                profile: {...state.profile, name: action.name}
            }
        }
        case SET_MY_ID:
            return {...state, myId: action.myId}

        default:
            return state
    }
}

// actions
export const setUserProfileAC = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const)
export const setUserProfileNameAC = (name: string | null) => ({type: SET_NEW_USER_NAME, name} as const)
export const setProfileIdAC = (myId: string | null) => ({type: SET_MY_ID, myId} as const)


//thunks
export const authMeTC:any = (): AppThunk  => (dispatch) => {
    dispatch(getStatusAC('loading'))

    return authApi.me()
        .then(res => {
            if (res.status === 200) {
                dispatch(isLoginAC(true))
                dispatch(setUserProfileAC(res.data))
                dispatch(setProfileIdAC(res.data._id))
            }
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = (err.response && err.response.data) ? err.response.data.error : err.message;
            dispatch(setAppErrorAC(error));
        })
        .finally(() => {
            dispatch(getStatusAC('succeeded'));

        })
}

export const editProfileTC: any = (name:string): AppThunk => (dispatch) => {
    dispatch(getStatusAC('loading'))
    return profileAPI.updateProfile(name)
        .then(() => {
            dispatch(setUserProfileNameAC(name))

        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = (err.response && err.response.data) ? err.response.data.error : err.message;
            dispatch(setAppErrorAC(error));
        })
        .finally(() => {
            dispatch(getStatusAC('succeeded'));

        })
}

export const logOutTC: any = () => (dispatch: Dispatch) => {

    profileAPI.logOut()
        .then(() => {
            dispatch(isLoginAC(false))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = (err.response && err.response.data) ? err.response.data.error : err.message;
            dispatch(setAppErrorAC(error));
        })
        .finally(() => {
        })
}

//types
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_NEW_USER_NAME = 'SET_NEW_USER_NAME'
const SET_MY_ID = 'SET_MY_ID'


export type ProfileType = {
    _id: string | null
    email: string | null
    name: string | null
    avatar: string | null
    publicCardPacksCount: number | null
    created: Date | null
    updated: Date | null
    isAdmin: boolean | null
    verified: boolean | null
    rememberMe: boolean | null
    error: string | null
}
export type ProfileInitialStateType = {
    profile: ProfileType
    myId: string | null
    error: string | null
    status: RequestStatusType
}


export type ProfileActionsType =
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setUserProfileNameAC>
    | ReturnType<typeof setProfileIdAC>

