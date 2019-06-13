import {API_BASE_URL} from '../config';
import { cachedFetch } from './url-cache';
const Hive_URL = `${API_BASE_URL}hives/`;

const quickViewHive = hive => ({
    id: hive.id,
    title: hive.title,
    mission: hive.mission,
    posts: hive.posts.length,
    members: hive.members.length
});

const standardViewHive = hive => ({
    id: hive.id,
    title: hive.title,
    mission: hive.mission,
    posts: hive.posts,
    members: hive.members,
    createdAt: hive.createdAt
});

// GET - GENERAL BROWSING \\
export function generalBrowse(page) {
    const url = `${Hive_URL}browse/${page}`;
    return cachedFetch(url)
        .then(data => data.hives.map(quickViewHive));
}

export const GEN_BROWSE_REQUEST = 'GEN_BROWSE_REQUEST';
export const genBrowseRequest = () => ({
    type: GEN_BROWSE_REQUEST
});

export const GEN_BROWSE_SUCCESS = 'GEN_BROWSE_SUCCESS';
export const genBrowseSuccess = hives => ({
    type: GEN_BROWSE_SUCCESS,
    hives
});

export const GEN_BROWSE_ERROR = 'GEN_BROWSE_ERROR';
export const genBrowseError = error => ({
    type: GEN_BROWSE_ERROR,
    error
});

export const browseHives = page => dispatch => {
    dispatch(genBrowseRequest());
    return generalBrowse(page)
        .then(hives => dispatch(genBrowseSuccess(hives)))
        .catch(error => {
            console.log('Browsing error', error);
            dispatch(genBrowseError(error));
        });
};

// GET - VIEW HIVE \\
export function viewHive(title) {
    // Remove the effects of slugify for req param
    const formatted = title.replace(/-/g, " ");
    const urlTitle = encodeURIComponent(formatted);
    const url = `${Hive_URL}view/${urlTitle}`;
    return cachedFetch(url)
        .then(data => standardViewHive(data.feedback));
}

export const VIEW_HIVE_REQUEST = 'VIEW_HIVE_REQUEST';
export const viewHiveRequest = () => ({
    type: VIEW_HIVE_REQUEST
});

export const VIEW_HIVE_SUCCESS = 'VIEW_HIVE_SUCCESS';
export const viewHiveSuccess = hive => ({
    type: VIEW_HIVE_SUCCESS,
    hive
});

export const VIEW_HIVE_ERROR = 'VIEW_HIVE_ERROR';
export const viewHiveError = error => ({
    type: VIEW_HIVE_ERROR,
    error
});

export const viewHiveByTitle = title => dispatch => {
    dispatch(viewHiveRequest());
    return viewHive(title)
        .then(hive => dispatch(viewHiveSuccess(hive)))
        .catch(error => {
            console.log('Hive view error', error);
            dispatch(viewHiveError(error));
        });
};
