import {API_BASE_URL} from '../config';
const Comment_URL = `${API_BASE_URL}comments/`;

const commentView = comment => ({
    id: comment.id,
    author: comment.author,
    body: comment.body,
    user: comment.user,
    replies: comment.replies,
    createdAt: comment.createdAt
});

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
    const userId = getState().userProfile.user.profile.id;
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