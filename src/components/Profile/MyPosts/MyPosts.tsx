import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import {MapStatePropsType, MapDispatchPropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../common/formsControls/FormsControls";


type FormDataType = {
    newPostText: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

const MyPosts = (props: PropsType) => {

    let postsElements = props.posts.map((p) =>
        <Post
            key={p.id}
            message ={p.message}
            likeCount={p.likeCount}
            id={p.id}
        />
    );

    let addNewPost = (values: FormDataType) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={classes.myPosts}>
            <h3>My posts</h3>
            <AddNewPostForm onSubmit={addNewPost}/>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
}

let maxLength10 = maxLengthCreator(10);

const AddNewPost: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder={"Enter your post"}
                    component={Textarea}
                    name={"newPostText"}
                    validate={[requiredField, maxLength10]}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddNewPostForm = reduxForm<FormDataType>({form: 'login'})(AddNewPost)

export default MyPosts;