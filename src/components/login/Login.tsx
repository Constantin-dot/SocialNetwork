import React from "react";
import {reduxForm, InjectedFormProps} from "redux-form";
import {Input, createField} from "../common/formsControls/FormsControls";
import {requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {AuthDataType, login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {RootState} from "../../redux/redux-store";
import style from "./../common/formsControls/FormsControls.module.css"

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
    isAuth: boolean
    captchaUrl: string | null
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}

type FormPropsType = {
    captchaUrl: string | null
}

type MapStateToProps = {
    captchaUrl: string | null
    isAuth: AuthDataType
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string  | null) => void
}

const LoginForm: React.FC<InjectedFormProps<FormDataType, FormPropsType> & FormPropsType> = ({handleSubmit, error, captchaUrl }) => {
    return (

        <form onSubmit={handleSubmit}>
            {createField("Email", "email", [requiredField], Input)}
            {createField("Password", "password", [requiredField], Input, "password")}
            {createField(null, "rememberMe", [], Input, "checkbox", "remember me")}

            {captchaUrl && <img src={captchaUrl} alt={"captchaUrl"}/>}
            {captchaUrl && createField("Symbols from image", "captcha", [requiredField], Input)}

            {error && <div className={style.formSummeryError}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType, FormPropsType>({form: 'login'})(LoginForm)

const Login = (props: FormDataType & MapDispatchPropsType) => {

    const onSubmit = (formData: FormDataType) => {
        debugger
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {login})(Login);