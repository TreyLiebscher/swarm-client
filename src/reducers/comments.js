import {
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_ERROR
} from '../actions/comments';

const commentState = {
    comment: {},
    loading: false,
    error: null
};

export function createCommentReducer(state = commentState, action) {

    if (action.type === CREATE_COMMENT_SUCCESS) {
        const changedState = {
            comment: action.comment, 
            loading: false, 
            error: null
        };
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === CREATE_COMMENT_ERROR) {
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }

    return state;
}