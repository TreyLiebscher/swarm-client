import {
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_ERROR,
    CLEAR_NOTIFICATION_SUCCESS,
    CLEAR_NOTIFICATION_ERROR,    
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_ERROR
} from '../actions/users';

const userState = {
    username: '',
    email: '',
    id: '',
    comments: [],
    posts: [],
    ratedPosts: [],
    hives: [],
    notifications: [],
    conversations: [],
    loading: false,
    error: null
};

export function profileReducer(state = userState, action) {
    if (action.type === FETCH_PROFILE_SUCCESS) {
        const changedState = {
            username: action.profile.profile.username,
            email: action.profile.profile.email,
            id: action.profile.profile.id,
            comments: action.profile.profile.comments,
            posts: action.profile.profile.posts,
            ratedPosts: action.profile.profile.ratedPosts,
            hives: action.profile.profile.hives,
            notifications: action.profile.profile.notifications,
            conversations: action.profile.profile.conversations, 
            loading: false, 
            error: null
        };
        const newState = {...state, ...changedState};
        return newState;
    } 
    else if(action.type === CLEAR_NOTIFICATION_SUCCESS) {
        const changedState = {
            notifications: action.profile.profile.notifications, 
            loading: false, 
            error: null
        };
        const newState = {...state, ...changedState};
        return newState;
    } 
    else if(action.type === FETCH_PROFILE_ERROR){
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    } 
    else if(action.type === SEND_MESSAGE_SUCCESS){
        const changedState = {
            conversations: action.profile.profile.conversations, 
            loading: false, 
            error: null
        };
        const newState = {...state, ...changedState};
        return newState;
    } 
    else if(action.type === CLEAR_NOTIFICATION_ERROR){
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }
    return state;
}