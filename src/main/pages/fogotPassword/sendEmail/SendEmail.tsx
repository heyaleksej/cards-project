import {useAppSelector} from "../../../../app/hooks";
import Grid from "@mui/material/Grid";

export const SendEmail = () => {
    const email = useAppSelector(state => state.forgotPassword.email);

    return (
        <div>
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'} >
                    <h2 style={{textAlign: "center"}}>Check Email</h2>
                    <div style={{color: "grey"}}>{`We've sent Email with instructions to ${email}`}</div>
                </Grid>
            </Grid>
        </div>
    )
};