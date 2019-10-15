import {
    GET_CONVERSATION_SUCCESS,
    GET_CONVERSATION_ERROR,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_ERROR
} from '../actions/users';

const conversationState = {
    id: '',
    users: [],
    messages: [],
    loading: false,
    error: null
};

export function conversationReducer(state = conversationState, action){
    if(action.type === GET_CONVERSATION_SUCCESS){
        const changedState = {
            id: action.conversation.conversation._id,
            users: action.conversation.conversation.users,
            messages: action.conversation.conversation.messages,
            loading: false,
            error: null
        };
        const newState = {...state, ...changedState};
        return newState;
    }
    else if(action.type === GET_CONVERSATION_ERROR){
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if(action.type === SEND_MESSAGE_SUCCESS){
        const changedState = {
            messages: action.conversation.conversation.messages, 
            loading: false, 
            error: null
        };
        const newState = {...state, ...changedState};
        return newState;
    }
    else if(action.type === SEND_MESSAGE_ERROR){
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }
    return state;
}