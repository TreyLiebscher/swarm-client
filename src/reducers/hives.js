import {
    GEN_BROWSE_REQUEST,
    GEN_BROWSE_SUCCESS,
    GEN_BROWSE_ERROR,
    VIEW_HIVE_REQUEST,
    VIEW_HIVE_SUCCESS,
    VIEW_HIVE_ERROR,
    BUILD_HIVE_SUCCESS,
    BUILD_HIVE_ERROR,
    JOIN_HIVE_SUCCESS,
    JOIN_HIVE_ERROR,
    LEAVE_HIVE_SUCCESS,
    LEAVE_HIVE_ERROR
} from '../actions/hives';

const browseState = {
    hives: [],
    currentPage: 1,
    pages: '',
    totalHives: '',
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
        const changedState = {
            hives: action.hives.hives,
            currentPage: action.hives.currentPage,
            pages: action.hives.pages,
            totalHives: action.hives.totalHives, 
            loading: false, 
            error: null
        };
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
    id: '',
    title: '',
    mission: '',
    founder: '',
    monitors: [],
    members: [],
    createdAt: '',
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
        const changedState = {
            id: action.hive.id,
            title: action.hive.title,
            mission: action.hive.mission,
            founder: action.hive.founder,
            monitors: action.hive.monitors,
            members: action.hive.members,
            createdAt: action.hive.createdAt, 
            posts: action.hive.posts, 
            loading: false, 
            error: null
        };
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === VIEW_HIVE_ERROR) {
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === JOIN_HIVE_SUCCESS) {
        const changedState = {
            members: action.hive.hive.members, 
            loading: false, 
            error: null
        };
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === JOIN_HIVE_ERROR) {
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === LEAVE_HIVE_SUCCESS) {
        const changedState = {
            members: action.hive.hive.members, 
            loading: false, 
            error: null
        };
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === LEAVE_HIVE_ERROR) {
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
