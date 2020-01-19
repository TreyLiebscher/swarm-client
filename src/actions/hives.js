import {API_BASE_URL} from '../config';
import { cachedFetch, nonCachedFetch } from './url-cache';
const Hive_URL = `${API_BASE_URL}hives/`;

const quickViewHive = hive => ({
    id: hive._id,
    title: hive.title,
    mission: hive.mission,
    posts: hive.posts,
    members: hive.members
});

const standardViewHive = hive => ({
    id: hive._id,
    title: hive.title,
    mission: hive.mission,
    posts: hive.posts,
    members: hive.members,
    founder: hive.founder.username,
    monitors: hive.monitors,
    createdAt: hive.createdAt
});

// GET - GENERAL BROWSING \\
export function generalBrowse(page) {
    const url = `${Hive_URL}browse/${page}`;

    return cachedFetch(url)
        .then((data) => {
            return {
                hives: data.hives.map(quickViewHive),
                currentPage: data.currentPage,
                pages: data.pages,
                totalHives: data.totalHives
            }
        });
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
    return nonCachedFetch(url)
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

// POST - Build Hive \\
export const BUILD_HIVE_SUCCESS = 'BUILD_HIVE_SUCCESS';
export const buildHiveSuccess = (hive) => ({
    type: BUILD_HIVE_SUCCESS,
    hive
});

export const BUILD_HIVE_ERROR = 'BUILD_HIVE_ERROR';
export const buildHiveError = error => ({
    type: BUILD_HIVE_ERROR,
    error
});

export const buildHive = hive => (dispatch, getState) => {
    const userId = getState().userProfile.id;

    return fetch(`${API_BASE_URL}hives/build`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: userId,
            title: hive.title,
            mission: hive.mission
        })
    })
    .then(res => res.json())
    .then((hive) => dispatch(buildHiveSuccess(hive)))
    .catch(err => {
        dispatch(buildHiveError(err));
    });
}

// POST - Join Hive \\
export const JOIN_HIVE_SUCCESS = 'JOIN_HIVE_SUCCESS';
export const joinHiveSuccess = (hive) => ({
    type: JOIN_HIVE_SUCCESS,
    hive
});

export const JOIN_HIVE_ERROR = 'JOIN_HIVE_ERROR';
export const joinHiveError = error => ({
    type: JOIN_HIVE_ERROR,
    error
});

export const joinHive = hive => (dispatch, getState) => {
    const userId = getState().auth.currentUser.id;

    return fetch(`${API_BASE_URL}hives/join`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: userId,
            hive: hive.id
        })
    })
    .then(res => res.json())
    .then((hive) => dispatch(joinHiveSuccess(hive)))
    .catch(err => {
        dispatch(joinHiveError(err));
    });
}

// POST - Leave Hive \\
export const LEAVE_HIVE_SUCCESS = 'LEAVE_HIVE_SUCCESS';
export const leaveHiveSuccess = (hive) => ({
    type: LEAVE_HIVE_SUCCESS,
    hive
});

export const LEAVE_HIVE_ERROR = 'LEAVE_HIVE_ERROR';
export const leaveHiveError = error => ({
    type: LEAVE_HIVE_ERROR,
    error
});

export const leaveHive = hive => (dispatch, getState) => {
    const userId = getState().auth.currentUser.id;

    return fetch(`${API_BASE_URL}hives/leave`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: userId,
            hive: hive.id
        })
    })
    .then(res => res.json())
    .then((hive) => dispatch(leaveHiveSuccess(hive)))
    .catch(err => {
        dispatch(leaveHiveError(err));
    });
}

// PUT - Update Hive \\
export const UPDATE_HIVE_SUCCESS = 'UPDATE_HIVE_SUCCESS';
export const updateHiveSuccess = (hive) => ({
    type: UPDATE_HIVE_SUCCESS,
    hive
});

export const UPDATE_HIVE_ERROR = 'UPDATE_HIVE_ERROR';
export const updateHiveError = error => ({
    type: UPDATE_HIVE_ERROR,
    error
});

export const updateHive = (values, hive) => (dispatch, getState) => {
    const userId = getState().auth.currentUser.id;

    return fetch(`${API_BASE_URL}hives/update`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: userId,
            hive: hive.id,
            title: values.title,
            mission: values.mission
        })
    })
    .then(res => res.json())
    .then((hive) => dispatch(updateHiveSuccess(hive)))
    .catch(err => {
        dispatch(updateHiveError(err));
    });
}

// DELETE - Delete Hive \\
export const DELETE_HIVE_SUCCESS = 'DELETE_HIVE_SUCCESS';
export const deleteHiveSuccess = (hive) => ({
    type: DELETE_HIVE_SUCCESS,
    hive
});

export const DELETE_HIVE_ERROR = 'DELETE_HIVE_ERROR';
export const deleteHiveError = error => ({
    type: DELETE_HIVE_ERROR,
    error
});

export const deleteHive = hive => (dispatch, getState) => {
    // const userId = getState().auth.currentUser.id;

    return fetch(`${API_BASE_URL}hives/delete/${hive.id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then((hive) => dispatch(deleteHiveSuccess(hive)))
    .catch(err => {
        dispatch(deleteHiveError(err));
    });
}



