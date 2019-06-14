import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utilities';

export const registerUser = user => dispatch => {
    return fetch(`${API_BASE_URL}users/user/createUser`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};

export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const fetchProfileSuccess = (profile) => ({
    type: FETCH_PROFILE_SUCCESS,
    profile
});

export const FETCH_PROFILE_ERROR = 'FETCH_PROFILE_ERROR';
export const fetchProfileError = error => ({
    type: FETCH_PROFILE_ERROR,
    error
});

export const getProfile = user => (dispatch, getState) => {
    const AUTH_TOKEN = getState().auth.authToken;
    
    return fetch(`${API_BASE_URL}users/profile/home`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${AUTH_TOKEN}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((profile) => dispatch(fetchProfileSuccess(profile)))
        .catch(err => {
            dispatch(fetchProfileError(err));
        });
};