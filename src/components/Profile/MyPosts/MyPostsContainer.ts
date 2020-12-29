import {actions} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";
import {PostType} from "../../../types/types";

export type MapStatePropsType = {
    posts: Array<PostType>
}

export type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}


const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(actions.addPostActionCreator(newPostText))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps )(MyPosts)

export default MyPostsContainer