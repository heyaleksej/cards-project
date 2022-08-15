import {AppThunk} from '../../../app/store';
import {authApi, UpdatePasswordPayloadType} from "../../../api/authApi/authAPI";
import {getStatusAC, setAppErrorAC} from "../../../app/app-reducer";

const initialState: SetPasswordStateType = {
    isUpdatePassword: false,
}

export const setPasswordReducer = (state: SetPasswordStateType = initialState, action: ActionsForSetPasswordType): SetPasswordStateType => {
    switch (action.type) {
        case 'SET-PASSWORD/UPDATE-PASSWORD':
            return {...state, isUpdatePassword: action.isUpdatePass};
        default:
            return state;
    }
}

//actions
export const setNewPassword = (isUpdatePass: boolean) => ({type: 'SET-PASSWORD/UPDATE-PASSWORD', isUpdatePass,} as const);

//thunks
export const updateNewPasswordTC = (data: UpdatePasswordPayloadType): AppThunk => dispatch => {
    dispatch(getStatusAC('loading'));

    authApi.updatePassword(data)
        .then(res => {
            dispatch(setNewPassword(true));
        })
        .catch((e) => {
            dispatch(setAppErrorAC(e.message));
        })
        .finally(() => {
            dispatch(getStatusAC('succeeded'));
        })
}

//types
export type ActionsForSetPasswordType = ReturnType<typeof setNewPassword>
export type SetPasswordStateType = {
    isUpdatePassword: boolean
}

