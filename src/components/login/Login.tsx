import React from "react";
import {Field, reduxForm, InjectedFormProps } from "redux-form";
import {Input} from "../common/formsControls/FormsControls";
import {requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {AuthDataType, login} from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import {RootState} from "../../redux/redux-store";
import style from "./../common/formsControls/FormsControls.module.css"

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    isAuth: boolean
    login: (email: string, password: string, rememberMe: boolean) => void
}

type MapStateToProps = {
    isAuth: AuthDataType
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder={"Email"}
                    component={Input}
                    name={"email"}
                    validate={[requiredField]}
                />
            </div>
            <div>
                <Field
                    placeholder={"Password"}
                    component={Input}
                    name={"password"}
                    type={"password"}
                    validate={[requiredField]}
                />
            </div>
            <Field
                type={"checkbox"}
                component={Input}
                name={"rememberMe"}
            /> remember me
            { props.error && <div className={style.formSummeryError}>
                {props.error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const Login = (props: FormDataType & MapDispatchPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {login})(Login);