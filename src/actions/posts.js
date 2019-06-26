import {API_BASE_URL} from '../config';
import { cachedFetch } from './url-cache';
import {stringToArray} from './utilities';
const Post_URL = `${API_BASE_URL}posts/`;

const standardQuickViewPost = post => ({
    id: post.id,
    hive: post.hive,
    author: post.author,
    title: post.title,
    image: post.image,
    comments: post.comments,
    tags: post.tags,
    createdAt: post.createdAt
});

const standardViewPost = post => ({
    id: post.feedback.id,
    hive: post.feedback.hive,
    author: post.feedback.author,
    title: post.feedback.title,
    link: post.feedback.link,
    body: post.feedback.body,
    image: post.feedback.image,
    comments: post.feedback.comments,
    tags: post.feedback.tags,
    createdAt: post.feedback.createdAt,
    ratings: post.feedback.ratings,
    raters: post.feedback.raters,
    currentPage: post.currentPage,
    pages: post.pages,
    totalComments: post.totalComments
});

// GET - GENERAL BROWSING \\
export function generalBrowse(page) {
    const url = `${Post_URL}browse/${page}`;
    return cachedFetch(url)
        .then(data => data.posts.map(standardQuickViewPost));
}

export const GEN_BROWSE_REQUEST = 'GEN_BROWSE_REQUEST';
export const genBrowseRequest = () => ({
    type: GEN_BROWSE_REQUEST
});

export const GEN_BROWSE_SUCCESS = 'GEN_BROWSE_SUCCESS';
export const genBrowseSuccess = posts => ({
    type: GEN_BROWSE_SUCCESS,
    posts
});

export const GEN_BROWSE_ERROR = 'GEN_BROWSE_ERROR';
export const genBrowseError = error => ({
    type: GEN_BROWSE_ERROR,
    error
});

export const browsePosts = page => dispatch => {
    dispatch(genBrowseRequest());
    return generalBrowse(page)
        .then(posts => dispatch(genBrowseSuccess(posts)))
        .catch(error => {
            console.log('Browsing error', error);
            dispatch(genBrowseError(error));
        });
};

// POST - VIEW POST \\
export function viewPost(postId, page) {
    return fetch(`${API_BASE_URL}posts/test/${postId}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            page: page
        })
    })
    .then(res => res.json())
    .then(post => standardViewPost(post));
}

export const VIEW_POST_REQUEST = 'VIEW_POST_REQUEST';
export const viewPostRequest = () => ({
    type: VIEW_POST_REQUEST
});

export const VIEW_POST_SUCCESS = 'VIEW_POST_SUCCESS';
export const viewPostSuccess = post => ({
    type: VIEW_POST_SUCCESS,
    post
});

export const VIEW_POST_ERROR = 'VIEW_POST_ERROR';
export const viewPostError = error => ({
    type: VIEW_POST_ERROR,
    error
});

export const viewPostById = (postId, page) => dispatch => {
    dispatch(viewPostRequest());
    return viewPost(postId, page)
        .then(post => dispatch(viewPostSuccess(post)))
        .catch(error => {
            dispatch(viewPostError(error));
        });
};

// Post + comment pagination
export const POST_COMMENTS_REQUEST = 'POST_COMMENTS_REQUEST';
export const postCommentsRequest = () => ({
    type: POST_COMMENTS_REQUEST
});

export const POST_COMMENTS_SUCCESS = 'POST_COMMENTS_SUCCESS';
export const postCommentsSuccess = post => ({
    type: POST_COMMENTS_SUCCESS,
    post
});

export const POST_COMMENTS_ERROR = 'POST_COMMENTS_ERROR';
export const postCommentsError = error => ({
    type: POST_COMMENTS_ERROR,
    error
});

export const postComments = (postId, page) => dispatch => {
    dispatch(postCommentsRequest());
    return viewPost(postId, page)
        .then(post => dispatch(postCommentsSuccess(post)))
        .catch(error => {
            dispatch(postCommentsError(error));
        });
};

export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const createPostSuccess = (post) => ({
    type: CREATE_POST_SUCCESS,
    post
});

export const CREATE_POST_ERROR = 'CREATE_POST_ERROR';
export const createPostError = error => ({
    type: CREATE_POST_ERROR,
    error
});

export const createPost = (post, hive) => (dispatch, getState) => {
    const userId = getState().userProfile.id;
    const tags = stringToArray(post.tags);
    return fetch(`${API_BASE_URL}posts/create/${hive}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: userId,
            title: post.title,
            body: post.body,
            link: post.link,
            image: post.image,
            tags: tags
        })
    })
    .then(res => res.json())
    .then((post) => dispatch(createPostSuccess(post)))
    .catch(err => {
        dispatch(createPostError(err));
    });
}

export const RATE_POST_SUCCESS = 'RATE_POST_SUCCESS';
export const ratePostSuccess = (post) => ({
    type: RATE_POST_SUCCESS,
    post
});

export const RATE_POST_ERROR = 'RATE_POST_ERROR';
export const ratePostError = error => ({
    type: RATE_POST_ERROR,
    error
});

export const ratePost = (post) => (dispatch, getState) => {
    const userId = getState().userProfile.id;
    return fetch(`${API_BASE_URL}posts/rate`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'   
        },
        body: JSON.stringify({
            user: userId,
            post: post.post,
            rating: post.rating
        })
    })
    .then(res => res.json())
    .then((post) => dispatch(ratePostSuccess(post)))
    .catch(err => {
        dispatch(ratePostError(err))
    });
}