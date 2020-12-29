import React from "react";
import styles from "./FormsControls.module.css";
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators/validators";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = (
    {meta: {touched, error}, children}
    ) => {
    const hasError = touched && error
    return (
        <div className={styles.formControl + " " + hasError ? styles.error : ""}>
            <div>
                {children}
            </div>
            <div>
                {hasError && <span>{error}</span>}
            </div>
        </div>
    )
}

export const Textarea = (props: WrappedFieldProps) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input = (props: WrappedFieldProps) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export function createField<FormKeysType extends string>(placeholder: string | null,
                            name: FormKeysType, validators: Array<FieldValidatorType>,
                            component: React.FC< WrappedFieldProps>, type?: string, text?: string) {
    return <div>
        <Field placeholder={placeholder}
               component={component}
               name={name}
               validate={validators}
               type={type}
        />
        {text}
    </div>
}

