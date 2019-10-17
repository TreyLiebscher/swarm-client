import {
    VIEW_COMMENT_REQUEST,
    VIEW_COMMENT_SUCCESS,
    VIEW_COMMENT_ERROR,
    COMMENT_REPLY_SUCCESS,
    COMMENT_REPLY_ERROR
} from '../actions/comments';

const commentState = {
    _id: '',
    post: '',
    author: '',
    body: '',
    replies: [],
    raters: [],
    ratings: [],
    score: '',
    createdAt: '',
    loading: false,
    error: null
}

export function commentReducer(state = commentState, action) {
    if(action.type === VIEW_COMMENT_REQUEST){
        const changedState = {loading: true, error: null};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if(action.type === VIEW_COMMENT_SUCCESS){
        const comment = action.comment.feedback;
        const changedState = {
            _id: comment._id,
            post: comment.post,
            author: comment.author,
            body: comment.body,
            replies: comment.replies,
            raters: comment.raters,
            ratings: comment.ratings,
            score: comment.score,
            createdAt: comment.createdAt,
            loading: false,
            error: null
        };
        const newState = {...state, ...changedState};
        return newState;
    }
    else if(action.type === VIEW_COMMENT_ERROR){
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if(action.type === COMMENT_REPLY_SUCCESS){
        const changedState = {
            replies: action.comment.feedback.replies,
            loading: false,
            error: null
        }
        const newState = {...state, ...changedState};
        return newState;
    }
    else if(action.type === COMMENT_REPLY_ERROR){
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }

    return state;
}