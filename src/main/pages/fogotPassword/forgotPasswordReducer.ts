import {AppThunk} from '../../../app/store';
import {getStatusAC, setAppErrorAC} from "../../../app/app-reducer";
import {authApi} from "../../../api/authApi/authAPI";

export type ForgotPasswordActionType = {
    email: string
    from: string
    message: string
}

export type ForgotPasswordStateType = {
    email: string
    isSendEmail: boolean
}

const initialState: ForgotPasswordStateType = {
    email: 'example@mail.com',
    isSendEmail: false,
}

export const forgotPasswordReducer = (state: ForgotPasswordStateType = initialState, action: ForgotPasswordActionsType): ForgotPasswordStateType => {
    switch (action.type) {
        case 'RECOVERY-PASSWORD/SET-IS-SEND-EMAIL':
            return {...state, isSendEmail: action.isSend};
        case 'RECOVERY-PASSWORD/SET-EMAIL':
            return {...state, email: action.email};
        default:
            return state;
    }
};

//actions
export const setIsSendEmail = (isSend: boolean) => ({type: 'RECOVERY-PASSWORD/SET-IS-SEND-EMAIL', isSend,} as const);
export const setEmail = (email: string) => ({type: 'RECOVERY-PASSWORD/SET-EMAIL', email,} as const);

//thunks
export const forgotPassTC = (email: string): AppThunk => dispatch => {
    dispatch(getStatusAC('loading'));

    const data: ForgotPasswordActionType = {
        email: email,
        from: 'dasha-golenko@mail.ru',
        message: `<div style="background-color: lime; padding: 15px">Password recovery link: 
                  <a href='https://dora-applepie.github.io/friday-project/#/set-password/$token$'> link</a>
                  </div>`,
    }

    authApi.forgotPassword(data)
        .then(() => {
            dispatch(setIsSendEmail(true));
            dispatch(setEmail(email));
        })
        .catch((e) => {
            dispatch(setAppErrorAC(e.message));
        })
        .finally(() => {
            dispatch(getStatusAC('succeeded'));
        })
};

//types
export type ForgotPasswordActionsType =
    | ReturnType<typeof setIsSendEmail>
    | ReturnType<typeof setEmail>


