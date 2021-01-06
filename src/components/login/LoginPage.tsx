import React from "react";
import {reduxForm, InjectedFormProps} from "redux-form";
import {Input, createField, GetStringKeys} from "../common/formsControls/FormsControls";
import {requiredField} from "../../utils/validators/validators";
import {connect, useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import style from "./../common/formsControls/FormsControls.module.css"

type LoginFormPropsType = {
    captchaUrl: string | null
}

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormPropsType> & LoginFormPropsType> = (
    {handleSubmit, error, captchaUrl }
    ) => {
    return (

        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("Email", "email", [requiredField], Input)}
            {createField<LoginFormValuesTypeKeys>("Password", "password", [requiredField], Input, "password")}
            {createField<LoginFormValuesTypeKeys>(null, "rememberMe", [], Input, "checkbox", "remember me")}

            {captchaUrl && <img src={captchaUrl} alt={"captchaUrl"}/>}
            {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [requiredField], Input)}

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

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormPropsType>({form: 'login'})(LoginForm)

export const LoginPage: React.FC = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    )
}
