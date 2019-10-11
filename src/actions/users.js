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

// GET - Public Profile \\
export const getPublicProfile = user => dispatch => {
    
    return fetch(`${API_BASE_URL}users/${user}`, {
        method: 'GET'
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((profile) => dispatch(fetchProfileSuccess(profile)))
        .catch(err => {
            dispatch(fetchProfileError(err));
        });
};
// ---------------------- \\

export const CLEAR_NOTIFICATION_SUCCESS = 'CLEAR_NOTIFICATION_SUCCESS';
export const clearNotificationSuccess = (profile) => ({
    type: CLEAR_NOTIFICATION_SUCCESS,
    profile
});

export const CLEAR_NOTIFICATION_ERROR = 'CLEAR_NOTIFICATION_ERROR';
export const clearNotificationError = error => ({
    type: CLEAR_NOTIFICATION_ERROR,
    error
});
// TODO: For some reason, the clearNotificationSuccess action is not being
// received by reducer properly. For now, this simply calls the fetchProfileSuccess
// action
export const clearNotification = (values) => (dispatch, getState) => {
    const AUTH_TOKEN = getState().auth.authToken;
    return fetch(`${API_BASE_URL}users/clear-notification`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${AUTH_TOKEN}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: values.user,
            notification: values.notification
        })
    })
    .then(res => res.json())
    .then((profile) => dispatch(fetchProfileSuccess(profile)))
    .catch(err => {
        dispatch(clearNotificationError(err));
    });
}
// ---------------------- \\

// POST - Send a message \\
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const sendMessageSuccess = (profile) => ({
    type: SEND_MESSAGE_SUCCESS,
    profile
});

export const SEND_MESSAGE_ERROR = 'SEND_MESSAGE_ERROR';
export const sendMessageError = error => ({
    type: SEND_MESSAGE_ERROR,
    error
});

export const sendMessage = (sender, receiver, body, conversation) => (dispatch, getState) => {
    let record;
    if(!(conversation)){
        record = null;
    } else {
        record = conversation;
    }

    return fetch(`${API_BASE_URL}users/send`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            users: [sender, receiver],
            sender: sender,
            receiver: receiver,
            body: body.body,
            conversation: record
        })
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((profile) => dispatch(fetchProfileSuccess(profile)))
    .catch(err => {
        dispatch(sendMessageError(err));
    });
}
// ---------------------- \\