import {API_BASE_URL} from '../config';
const Comment_URL = `${API_BASE_URL}comments/`;

export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const createCommentSuccess = (comment) => ({
    type: CREATE_COMMENT_SUCCESS,
    comment
});

export const CREATE_COMMENT_ERROR = 'CREATE_COMMENT_ERROR';
export const createCommentError = (error) => ({
    type: CREATE_COMMENT_ERROR,
    error
});

export const createComment = (comment, post) => (dispatch, getState) => {
    const userId = getState().auth.currentUser.id;
    return fetch(`${Comment_URL}create`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'   
        },
        body: JSON.stringify({
            user: userId,
            body: comment.body,
            post: post
        })
    })
    .then(res => res.json())
    .then((comment) => dispatch(createCommentSuccess(comment)))
    .catch(err => {
        dispatch(createCommentError(err));
    });
}

export const COMMENT_REPLY_SUCCESS = 'COMMENT_REPLY_SUCCESS';
export const commentReplySuccess = (comment) => ({
    type: COMMENT_REPLY_SUCCESS,
    comment
});

export const COMMENT_REPLY_ERROR = 'COMMENT_REPLY_ERROR';
export const commentReplyError = (error) => ({
    type: COMMENT_REPLY_ERROR,
    error
});

export const commentReply = (comment, post, homePost) => (dispatch, getState) => {
    const AUTH_TOKEN = getState().auth.authToken;

    return fetch(`${Comment_URL}reply`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${AUTH_TOKEN}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'   
        },
        body: JSON.stringify({
            body: comment.body,
            comment: post,
            homePost: homePost 
        })
    })
    .then(res => res.json())
    .then((comment) => dispatch(commentReplySuccess(comment)))
    .catch(err => {
        dispatch(commentReplyError(err));
    });
}

export const RATE_COMMENT_SUCCESS = 'RATE_COMMENT_SUCCESS';
export const rateCommentSuccess = (comment) => ({
    type: RATE_COMMENT_SUCCESS,
    comment
});

export const RATE_COMMENT_ERROR = 'RATE_COMMENT_ERROR';
export const rateCommentError = error => ({
    type: RATE_COMMENT_ERROR,
    error
});

export const rateComment = (comment) => (dispatch, getState) => {
    const userId = getState().auth.currentUser.id;
    return fetch(`${API_BASE_URL}comments/rate`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'   
        },
        body: JSON.stringify({
            user: userId,
            comment: comment.comment,
            post: comment.post,
            rating: comment.rating
        })
    })
    .then(res => res.json())
    .then((comment) => dispatch(rateCommentSuccess(comment)))
    .catch(err => {
        dispatch(rateCommentError(err))
    });
}

export const VIEW_COMMENT_REQUEST = 'VIEW_COMMENT_REQUEST';
export const viewCommentRequest = () => ({
    type: VIEW_COMMENT_REQUEST
});

export const VIEW_COMMENT_SUCCESS = 'VIEW_COMMENT_SUCCESS';
export const viewCommentSuccess = comment => ({
    type: VIEW_COMMENT_SUCCESS,
    comment
});

export const VIEW_COMMENT_ERROR = 'VIEW_COMMENT_ERROR';
export const viewCommentError = error => ({
    type: VIEW_COMMENT_ERROR,
    error
});

export const viewComment = id => dispatch => {
    dispatch(viewCommentRequest());
    return fetch(`${API_BASE_URL}comments/view/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then((comment) => dispatch(viewCommentSuccess(comment)))
    .catch(err => {
        dispatch(viewCommentError(err));
    });
};

