import {API_BASE_URL} from '../config';
import { cachedFetch, nonCachedFetch } from './url-cache';
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
    id: post.id,
    hive: post.hive,
    author: post.author,
    title: post.title,
    link: post.link,
    body: post.body,
    image: post.image,
    comments: post.comments,
    tags: post.tags,
    createdAt: post.createdAt
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

// GET - VIEW POST \\
export function viewPost(postId) {
    const url = `${Post_URL}view/${postId}`;
    return nonCachedFetch(url)
        .then(data => standardViewPost(data.feedback));
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

export const viewPostById = id => dispatch => {
    dispatch(viewPostRequest());
    return viewPost(id)
        .then(post => dispatch(viewPostSuccess(post)))
        .catch(error => {
            console.log('Post view error', error);
            dispatch(viewPostError(error));
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
    const userId = getState().userProfile.user.profile.id;
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
            tags: tags,
            // hive: post.hive
        })
    })
    .then(res => res.json())
    .then((post) => dispatch(createPostSuccess(post)))
    .catch(err => {
        dispatch(createPostError(err));
    });
}