import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {Navigate, useParams} from "react-router-dom";
import React from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import {PATH} from "../../routes/Pages";
import {updateNewPasswordTC} from "./setPasswordReducer";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import s from "./../../../app/App.module.css";


type SetPasswordErrorType = {
    password?: string
}

const SetPassword = () => {
    const dispatch = useAppDispatch();

    const {token} = useParams<'token'>();

    const isUpdatePassword = useAppSelector(state => state.setPassword.isUpdatePassword);
    const status = useAppSelector(state => state.app.status);

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validate(values) {
            const errors: SetPasswordErrorType = {};

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 8) {
                errors.password = 'Password should be more than 8 symbols';
            }

            return errors;
        },
        onSubmit: values => {
            if (values.password && token) {
                const data = {password: values.password, resetPasswordToken: token};

                dispatch(updateNewPasswordTC(data));
                formik.resetForm();
            }
        }
    });

    if (isUpdatePassword) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid>
                <form onSubmit={formik.handleSubmit} title="Create new password">
                    <FormControl variant="standard" sx={{height: '71px', width: '100%'}}>
                        <FormGroup className={s.form}>
                            <h2 style={{textAlign: "center"}}>Set new password</h2>
                            <TextField
                                label="Password"
                                color="secondary"
                                margin="normal"
                                disabled={status === 'loading'}
                                type={'password'}
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password &&
                                <div style={{color: "red"}}>{formik.errors.password}</div>}

                            <div className={s.navLinkBottomBlock}>Create new password and we will send you further instructions
                                to email
                            </div>
                            <Button variant={'contained'} color="success" type="submit"
                                    disabled={status === 'loading'}>
                                Create new password</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}

export default SetPassword;