import {API_BASE_URL} from '../config';
import { cachedFetch } from './url-cache';
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

// GENERAL BROWSING \\
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




