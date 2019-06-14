import {
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_ERROR    
} from '../actions/users';

const userState = {
    user: {},
    loading: false,
    error: null
};

export function profileReducer(state = userState, action) {
    if (action.type === FETCH_PROFILE_SUCCESS) {
        const changedState = {user: action.profile, loading: false, error: null};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === FETCH_PROFILE_ERROR) {
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }
    return state;
}