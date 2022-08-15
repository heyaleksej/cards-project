import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {LoginActionType, loginReducer} from "../main/pages/login/loginReducer";
import {page404Reducer} from "../main/pages/page_404/page404Reducer";
import {ProfileActionsType, profileReducer} from "../main/pages/profile/profileReducer";
import {ForgotPasswordActionType, forgotPasswordReducer} from "../main/pages/fogotPassword/forgotPasswordReducer";
import {ActionsForSetPasswordType, setPasswordReducer} from "../main/pages/setPassword/setPasswordReducer";
import {RegisterActionType, registrationReducer} from "../main/pages/registration/registrationReducer";
import {appReducer} from "./app-reducer";
import {packsListReducer} from "../main/pages/packs/packsListReducer";
import {packsTableReducer} from "../main/pages/packs/PacksTable/packsTableReducer";
import {cardsNameReducer} from "../main/pages/cards/cardsReducer";
import {learnPackReducer} from "../main/pages/packs/PacksTable/learnPack/learnPackReducer";


const reducers = combineReducers({
    app: appReducer,
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    page404: page404Reducer,
    forgotPassword: forgotPasswordReducer,
    setPassword: setPasswordReducer,
    packList: packsListReducer,
    tablePacks: packsTableReducer,
    cardPack: cardsNameReducer,
    learnPack: learnPackReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export type CommonActionTypeForApp = LoginActionType |
    ForgotPasswordActionType | ActionsForSetPasswordType | ProfileActionsType
    | RegisterActionType;

export type AppStoreType = ReturnType<typeof reducers>

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>


// @ts-ignore
window.store = store;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

export default store