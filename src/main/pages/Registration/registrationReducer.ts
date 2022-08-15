import {AppThunk} from "../../../app/store";
import {AxiosError} from "axios";
import {Dispatch} from "redux";
import {registrationApi} from "../../../api/registerApi/registrationAPI";
import {getStatusAC, setAppErrorAC} from "../../../app/app-reducer";

const initialState: RegistrationStateType = {
    message: null,
};

export const registrationReducer = (state: RegistrationStateType = initialState, action: RegisterActionType): RegistrationStateType => {
    switch (action.type) {
        case 'REGISTRATION/SET-MESSAGE':
            return {...state, message: action.message};
        default:
            return state;
    }
};

//actions
export const setRegisterMessageAC = (message: string | null) => ({type: 'REGISTRATION/SET-MESSAGE', message} as const);

//thunk
export const registrationTC = (data: { email: string; password: string }): AppThunk =>
    (dispatch: Dispatch) => {
        dispatch(getStatusAC('loading'));
        registrationApi.registrationRequest(data)
            .then((res) => {
                if (res.data.addedUser) {
                    dispatch(setRegisterMessageAC('You have successfully registered'));
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
}
export type RegisterActionType = ReturnType<typeof setRegisterMessageAC>

