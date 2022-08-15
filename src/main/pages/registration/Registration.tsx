import {FormGroup, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import {useFormik} from "formik";
import React from "react";
import Button from "@mui/material/Button";
import {PATH} from "../../routes/Routes";
import {Navigate, NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import s from "./../../../app/App.module.css";
import {registrationTC} from "./registrationReducer";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
    confirmPassword?: string
}

const Registration = () => {

    const dispatch = useAppDispatch();

    const status = useAppSelector(state => state.app.status);
    const isLoggedIn = useAppSelector(state => state.login.isLogin)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: values => {
            // dispatch(registrationTC(values))
            // formik.resetForm();
            dispatch(registrationTC(values));
            formik.resetForm({values: {email: values.email, password: '', confirmPassword: ''}});
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length <= 7) {
                errors.password = 'Must be 8 characters or more symbols in password';
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Please, confirm your password';
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Password is incorrect';
            }
            return errors;
        },
    })

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup className={s.form}>
                            <h2 style={{textAlign: "center"}}>Registration</h2>
                            <TextField
                                label='Email'
                                margin='normal'
                                color='primary'
                                style={{minWidth: '305px'}}
                                disabled={status === 'loading'}
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email &&
                            <div style={{color: "red"}}>{formik.errors.email}</div>}
                            <TextField
                                type='password'
                                label='Password'
                                margin='normal'
                                disabled={status === 'loading'}
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.email && formik.errors.password &&
                            <div style={{color: "red"}}>{formik.errors.password}</div>}
                            <TextField
                                type='password'
                                label='Confirm password'
                                margin='normal'
                                disabled={status === 'loading'}
                                {...formik.getFieldProps('confirmPassword')}
                            />
                            {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword ?
                                <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div> : null}
                            <Button className={s.forgotPassword} disabled={status === 'loading'} color="success"
                                    type={'submit'} variant={'contained'}>
                                Sign Up
                            </Button>
                            <div className={s.navLinkBottomBlock} style={{color: "grey"}}>Already have an account?</div>
                            <NavLink className={s.navLinkBottomBlock} to={PATH.LOGIN}>Sign In</NavLink>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}

export default Registration