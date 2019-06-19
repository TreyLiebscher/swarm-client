import {
    GEN_BROWSE_REQUEST,
    GEN_BROWSE_SUCCESS,
    GEN_BROWSE_ERROR,
    VIEW_POST_REQUEST,
    VIEW_POST_SUCCESS,
    VIEW_POST_ERROR,
    CREATE_POST_SUCCESS,
    CREATE_POST_ERROR
} from '../actions/posts';

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



