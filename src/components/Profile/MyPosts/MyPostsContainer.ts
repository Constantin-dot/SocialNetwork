import {addPostActionCreator, PostType} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {RootState} from "../../../redux/redux-store";
import {Dispatch} from "redux";

export type MapStatePropsType = {
    posts: Array<PostType>
}

export type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}


const mapStateToProps = (state: RootState) => {
    return {
        posts: state.profilePage.posts,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostActionCreator(newPostText));
        },
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps )(MyPosts);

export default MyPostsContainer;