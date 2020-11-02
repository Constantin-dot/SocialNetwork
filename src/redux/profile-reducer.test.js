import React from "react";
import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";
import {v1} from "uuid";

let state = {
    posts: [
        {id: v1(), message: 'hi, how are you?', likeCount: 5},
        {id: v1(), message: 'It\'s my first post', likeCount: 11},
    ]
};

it("length of posts should be incremented", () => {
    // 1.test data
    let action = addPostActionCreator("it-kamasutra.com");

    // 2.action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts.length).toBe(3);
})

it("message of new post should be correct", () => {
    // 1.test data
    let action = addPostActionCreator("it-kamasutra.com");

    // 2.action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts[2].message).toBe("it-kamasutra.com");
})

it("after deleting length of message should be decrement", () => {
    // 1.test data
    let action = deletePost(state.posts[0].id);

    // 2.action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts.length).toBe(1);
})

it("after deleting length shouldn't be decrement if id is incorrect", () => {
    // 1.test data
    let action = deletePost("it-kamasutra.com");

    // 2.action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts.length).toBe(2);
})
