import { Navigate } from "react-router-dom";
import {useAppSelector} from "../../../app/hooks";
import { PATH } from "../../routes/Pages";
import Registration from "./Registration";

export const RegContainer = () => {
    const isRegistration = useAppSelector(state => state.registration.isRegistration)

    if (isRegistration) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <Registration
        />
    )
};