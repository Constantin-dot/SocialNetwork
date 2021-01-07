import React from "react";
import {Field, Form, Formik} from "formik";
import {FilterType} from "../../redux/users-reducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/users-selectors";

const usersSearchFormValidate = () => {
        const errors = {}
        // if (!values.email) {
        //     errors.email = 'Required'
        // } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        // ) {
        //     errors.email = 'Invalid email address'
        // }
        return errors
}

type FriendType = "true" | "false" | "null"

type FormType = {
    term: string
    friend: FriendType
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<PropsType> = React.memo(({onFilterChanged}) => {
    const filter = useSelector(getUsersFilter)

    const submit = (values: FormType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        onFilterChanged(filter)
        setSubmitting(false)
    }

    return <div>
        <Formik
            initialValues={{term: filter.term, friend: String(filter.friend) as FriendType}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
            enableReinitialize
        >
            {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
              }) => (
                <Form onSubmit={handleSubmit}>
                    <Field type="text"
                           name="term"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.term} />
                    <Field as="select" name="friend">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})