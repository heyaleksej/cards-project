import {AppThunk} from "./store";
import {Dispatch} from "redux";
import {authMeTC, setProfileIdAC} from "../main/pages/profile/profileReducer";

export type RequestStatusType = 'loading' | 'succeeded'| 'idle'| 'failed'

export type InitialStateType = {
    initialized: boolean;
    status: RequestStatusType;
    error: string | null;
};

const initialState: InitialStateType = {
    initialized: false,
    status: 'loading' as RequestStatusType,
    error: null,
};

export const appReducer = (state: InitialStateType = initialState, action: AppActionType,
): InitialStateType => {
    switch (action.type) {
        case 'APP/INITIALIZED':
            return {...state, initialized: true};

        case 'APP/GET-STATUS':
            return {...state, status: action.status};

        case 'APP/SET-ERROR':
            return {...state, error: action.error};

        default: {
            return state;
        }
    }
};

//types
export type AppActionType =
    | ReturnType<typeof initializedAC>
    | ReturnType<typeof getStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setProfileIdAC>;


//actions
export const initializedAC = () =>
    ({type: 'APP/INITIALIZED'} as const);

export const getStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/GET-STATUS', status} as const);

export const setAppErrorAC = (error: string | null) =>
    ({type: 'APP/SET-ERROR', error} as const);

//thunk
export const initializeAppTC = (): AppThunk => (dispatch: Dispatch) => {

    dispatch(authMeTC()).then(() => {
            dispatch(initializedAC())
        })

};
