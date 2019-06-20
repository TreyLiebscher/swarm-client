import {
    GEN_BROWSE_REQUEST,
    GEN_BROWSE_SUCCESS,
    GEN_BROWSE_ERROR,
    VIEW_POST_REQUEST,
    VIEW_POST_SUCCESS,
    VIEW_POST_ERROR,
    CREATE_POST_SUCCESS,
    CREATE_POST_ERROR,
    RATE_POST_SUCCESS,
    RATE_POST_ERROR
} from '../actions/posts';

import {
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_ERROR
} from '../actions/comments';

const browseState = {
    posts: [],
    loading: false,
    error: null
};

export function browseReducer(state = browseState, action) {
    if (action.type === GEN_BROWSE_REQUEST) {
        const changedState = {loading: true, error: null};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === GEN_BROWSE_SUCCESS) {
        const changedState = {posts: action.posts, loading: false, error: null};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === GEN_BROWSE_ERROR) {
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }

    return state;
}

const postViewState = {
    post: {},
    comments: [],
    ratings: [],
    loading: false,
    error: null
};

export function viewReducer(state = postViewState, action) {
    if (action.type === VIEW_POST_REQUEST) {
        const changedState = {loading: true, error: null};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === VIEW_POST_SUCCESS) {
        const changedState = {
            post: action.post,
            comments: action.post.comments,
            ratings: action.post.ratings, 
            loading: false, 
            error: null
        };
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === RATE_POST_SUCCESS) {
        const changedState = {
            ratings: action.post.post.ratings, 
            loading: false, 
            error: null
        };
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === CREATE_COMMENT_SUCCESS) {
        const changedState = {
            comments: action.comment.userFeedback.comments, 
            loading: false, 
            error: null
        };
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === VIEW_POST_ERROR) {
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === RATE_POST_ERROR) {
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }

    return state;
}

const postCreateState = {
    post: {},
    loading: false,
    error: null
};

export function createPostReducer(state = postCreateState, action) {

    if (action.type === CREATE_POST_SUCCESS) {
        const changedState = {
            post: action.post, 
            loading: false, 
            error: null
        };
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === CREATE_POST_ERROR) {
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }

    return state;
}