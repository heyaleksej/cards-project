import {AppThunk} from "../../../app/store";
import {AxiosError} from "axios";
import {Dispatch} from "redux";
import {registrationApi} from "../../../api/registerApi/registrationAPI";
import {getStatusAC, setAppErrorAC} from "../../../app/app-reducer";

const initialState: RegistrationStateType = {
    message: null,
    isRegistration: false,

};

export const registrationReducer = (state: RegistrationStateType = initialState, action: RegisterActionTypes): RegistrationStateType => {
    switch (action.type) {
        case 'REGISTRATION/SET-MESSAGE':
            return {...state, message: action.message};
        case 'SIGN_UP':
            return {...state, isRegistration:action.isRegistration}

        default:
            return state;
    }
};

//AC
export const setRegisterMessageAC = (message: string | null) => ({type: 'REGISTRATION/SET-MESSAGE', message} as const);
export const isRegistrationAC = (isRegistration: boolean) => ({type: 'SIGN_UP', isRegistration} as const)

//thunk
export const registrationTC = (data: { email: string; password: string }): AppThunk =>
    (dispatch: Dispatch) => {
        dispatch(getStatusAC('loading'));
        registrationApi.registrationRequest(data)
            .then((res) => {
                if (res.data.addedUser) {
                    dispatch(setRegisterMessageAC('You have successfully registered'));
                    dispatch(isRegistrationAC(true))
                } else if (res.data.error) {
                    dispatch(setAppErrorAC(res.data.error));
                } else {
                    dispatch(setRegisterMessageAC('Some error occurred'));
                }
            })
            .catch((error: AxiosError<{ error: string }>) => {
                if (error.response) {
                    if (error.response.data === undefined) {
                        dispatch(setAppErrorAC(error.message));
                        dispatch(getStatusAC('failed'));
                    } else {
                        dispatch(setAppErrorAC(error.response.data.error));
                        dispatch(getStatusAC('failed'));
                    }
                }
            })
            .finally(() => {
                dispatch(getStatusAC('idle'));
            });
    };

//types
export type RegistrationStateType = {
    message: string | null
    isRegistration: boolean

}
export type RegisterActionTypes = ReturnType<typeof setRegisterMessageAC> | ReturnType<typeof isRegistrationAC>

