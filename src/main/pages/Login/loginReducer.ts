import {AppThunk} from "../../../app/store";
import {getStatusAC, setAppErrorAC} from "../../../app/app-reducer";
import {AxiosError} from "axios";
import {ProfileType, setUserProfileAC} from "../Profile/profileReducer";
import {loginApi, LoginPayloadType } from "../../../api/loginApi/loginAPI";

const initialState: LoginDataUserType = {
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
    error: null,
    isLogin: false,
};

export type LoginStateType = typeof initialState;

export const loginReducer = (state: LoginStateType = initialState, action: LoginActionType): LoginStateType => {
    switch (action.type) {
        case 'LOGIN/IS-LOGIN':
            return {...state, isLogin: action.payload.value};
        default: {
            return state;
        }
    }
};

//actions
export const isLoginAC = (value: boolean) =>
    ({type: 'LOGIN/IS-LOGIN', payload: {value}} as const);

//thunk
export const requestLoginTC = (data:LoginPayloadType): AppThunk =>
    (dispatch) => {
        dispatch(getStatusAC('loading'));

        loginApi.loginRequest(data)
            .then(res => {
                dispatch(isLoginAC(true))
                dispatch(setUserProfileAC(res.data));
            })
            .catch((e: AxiosError<{ error: string }>) => {
                const error = (e.response && e.response.data) ? e.response.data.error : e.message;
                dispatch(setAppErrorAC(error));
            })
            .finally(() => {
                dispatch(getStatusAC('succeeded'));
            })
    };

//types
export type LoginActionType = ReturnType<typeof isLoginAC>
export type LoginDataUserType = ProfileType & {
    isLogin: boolean
}

