import {
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_ERROR    
} from '../actions/users';

const userState = {
    // user: {},
    username: '',
    email: '',
    id: '',
    comments: [],
    posts: [],
    hives: [],
    loading: false,
    error: null
};

export function profileReducer(state = userState, action) {
    if (action.type === FETCH_PROFILE_SUCCESS) {
        console.log('kiwi', action.profile.profile)
        const changedState = {
            // user: action.profile,
            username: action.profile.profile.username,
            email: action.profile.profile.email,
            id: action.profile.profile.id,
            comments: action.profile.profile.comments,
            posts: action.profile.profile.posts,
            hives: action.profile.profile.hives, 
            loading: false, 
            error: null
        };
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