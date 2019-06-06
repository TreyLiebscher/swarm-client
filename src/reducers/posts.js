import {
    GEN_BROWSE_REQUEST,
    GEN_BROWSE_SUCCESS,
    GEN_BROWSE_ERROR
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