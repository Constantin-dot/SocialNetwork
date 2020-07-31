import {addPostActionCreator, newTextChangeHandlerActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {RootState} from "../../../redux/redux-store";
import {PostType} from "../../../redux/usingTypes";
import {Dispatch} from "redux";


export type MapStatePropsType = {
    posts: Array<PostType>
    newPostText: string
}

export type MapDispatchPropsType = {
    addPost: () => void
    updateNewPostText: (text: string) => void
}


const mapStateToProps = (state: RootState) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator());
        },
        updateNewPostText: (text: string) => {
            let action = newTextChangeHandlerActionCreator(text);
            dispatch(action);
        }
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps )(MyPosts);

export default MyPostsContainer;