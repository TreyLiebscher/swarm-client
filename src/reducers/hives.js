import {
    GEN_BROWSE_REQUEST,
    GEN_BROWSE_SUCCESS,
    GEN_BROWSE_ERROR,
    VIEW_HIVE_REQUEST,
    VIEW_HIVE_SUCCESS,
    VIEW_HIVE_ERROR,
    BUILD_HIVE_SUCCESS,
    BUILD_HIVE_ERROR
} from '../actions/hives';

const browseState = {
    hives: [],
    loading: false,
    error: null
};

export function hiveBrowse(state = browseState, action) {
    if (action.type === GEN_BROWSE_REQUEST) {
        const changedState = {loading: true, error: null};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === GEN_BROWSE_SUCCESS) {
        const changedState = {hives: action.hives, loading: false, error: null};
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

const viewState = {
    hive: {},
    posts: [],
    loading: false,
    error: null
};

export function hiveView(state = viewState, action) {
    if (action.type === VIEW_HIVE_REQUEST) {
        const changedState = {loading: true, error: null};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === VIEW_HIVE_SUCCESS) {
        const changedState = {hive: action.hive, posts: action.hive.posts, loading: false, error: null};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === VIEW_HIVE_ERROR) {
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }

    return state;
}

const buildState = {
    title: '',
    mission: '',
    posts: [],
    loading: false,
    error: null
};

export function hiveBuild(state = buildState, action) {
    if (action.type === BUILD_HIVE_SUCCESS) {
        const changedState = {
            title: action.hive.hive.title,
            mission: action.hive.hive.mission,
            posts: action.hive.hive.posts,
            loading: false,
            error: null
        }
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === BUILD_HIVE_ERROR) {
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }

    return state;
}
