import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';
import authReducer from './reducers/auth';
import {browseReducer, viewReducer, createPostReducer} from './reducers/posts';
import {hiveBrowse, hiveView, hiveBuild} from './reducers/hives';
import {profileReducer} from './reducers/users';
import {conversationReducer} from './reducers/conversation';
import {commentReducer} from './reducers/comments';
import {setAuthToken, refreshAuthToken} from './actions/auth';

const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        hives: hiveBrowse,
        hive: hiveView,
        buildHive: hiveBuild, 
        posts: browseReducer,
        post: viewReducer,
        comment: commentReducer,
        createPost: createPostReducer,
        userProfile: profileReducer,
        conversation: conversationReducer
    }),
    applyMiddleware(thunk)
);


const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;