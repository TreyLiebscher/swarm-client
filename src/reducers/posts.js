import {
    GEN_BROWSE_REQUEST,
    GEN_BROWSE_SUCCESS,
    GEN_BROWSE_ERROR,
    VIEW_POST_REQUEST,
    VIEW_POST_SUCCESS,
    VIEW_POST_ERROR,
    POST_COMMENTS_REQUEST,
    POST_COMMENTS_SUCCESS,
    POST_COMMENTS_ERROR,
    CREATE_POST_SUCCESS,
    CREATE_POST_ERROR,
    RATE_POST_SUCCESS,
    RATE_POST_ERROR,
    // TEST_POST_REQUEST,
    // TEST_POST_SUCCESS,
    // TEST_POST_ERROR
} from '../actions/posts';

import {
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_ERROR
} from '../actions/comments';

const browseState = {
    posts: [],
    loading: false,
    error: null
};

export function browseReducer(state = browseState, action) {
    if (action.type === GEN_BROWSE_REQUEST) {
        const changedState = {loading: true, error: null};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === GEN_BROWSE_SUCCESS) {
        const changedState = {posts: action.posts, loading: false, error: null};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === GEN_BROWSE_ERROR) {
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }

    return state;
}

const postViewState = {
    id: '',
    hive_title: '',
    hive_id: '',
    author: '',
    title: '',
    body: '',
    image: '',
    link: '',
    tags: [],
    createdAt: '',
    comments: [],
    ratings: [],
    raters: [],
    currentPage: '',
    pages: '',
    totalComments: '',
    loading: false,
    error: null
};

export function viewReducer(state = postViewState, action) {
    if (action.type === VIEW_POST_REQUEST) {
        const changedState = {loading: true, error: null};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === VIEW_POST_SUCCESS) {
        const changedState = {
            id: action.post.id,
            hive_title: action.post.hive.title,
            hive_id: action.post.hive.id,
            author: action.post.author,
            title: action.post.title,
            body: action.post.body,
            image: action.post.image,
            link: action.post.link,
            tags: action.post.tags,
            createdAt: action.post.createdAt,
            comments: action.post.comments,
            ratings: action.post.ratings,
            raters: action.post.raters,
            currentPage: action.post.currentPage,
            pages: action.post.pages,
            totalComments: action.post.totalComments, 
            loading: false, 
            error: null
        };
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === POST_COMMENTS_SUCCESS) {
        const changedState = {
            id: action.post.id,
            hive_title: action.post.hive.title,
            hive_id: action.post.hive.id,
            author: action.post.author,
            title: action.post.title,
            body: action.post.body,
            image: action.post.image,
            link: action.post.link,
            tags: action.post.tags,
            createdAt: action.post.createdAt,
            comments: [...state.comments, ...action.post.comments],
            ratings: action.post.ratings,
            currentPage: action.post.currentPage,
            pages: action.post.pages,
            totalComments: action.post.totalComments, 
            loading: false, 
            error: null
        };
        const newState = {...state, ...changedState};
        return newState;
    }

    else if (action.type === RATE_POST_SUCCESS) {
        const changedState = {
            ratings: action.post.post.ratings,
            raters: action.post.post.raters, 
            loading: false, 
            error: null
        };
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === CREATE_COMMENT_SUCCESS) {
        const changedState = {
            comments: action.comment.userFeedback.comments, 
            loading: false, 
            error: null
        };
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === CREATE_COMMENT_ERROR) {
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === VIEW_POST_ERROR) {
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === RATE_POST_ERROR) {
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }

    return state;
}

const postCreateState = {
    post: {},
    loading: false,
    error: null
};

export function createPostReducer(state = postCreateState, action) {

    if (action.type === CREATE_POST_SUCCESS) {
        const changedState = {
            post: action.post, 
            loading: false, 
            error: null
        };
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === CREATE_POST_ERROR) {
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }

    return state;
}