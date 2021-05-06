import {SET_CURRENT_PAGE, SET_IS_FETCHING, SET_REPOS , SET_FETCH_ERROR} from "../types/types";

const initialState = {
    items: [],
    isFetching: false,
    currentPage: 1,
    perPage: 5,
    totalCount: 0,
    isFetchError: false
}

const gitReducer = (state = initialState , action) => {
    switch (action.type) {
        case SET_REPOS: {
            return {...state , items: action.payload.items , totalCount: action.payload.total_count}
        }
        case SET_IS_FETCHING: {
            return {...state , isFetching: action.payload}
        }
        case SET_CURRENT_PAGE: {
            return {...state , currentPage: action.payload}
        }
        case SET_FETCH_ERROR: {
            return {...state , isFetchError: action.payload}
        }
        default: return state
    }
}

export default gitReducer