import axios from "axios";
import {SET_CURRENT_PAGE, SET_FETCH_ERROR, SET_IS_FETCHING, SET_REPOS} from "../types/types";

export const gitRepos = (searchQuery = "stars:%3E1" , currentPage  , perPage) => {
    if(searchQuery === '') {
        searchQuery = "stars:%3E1"
    }

    return async (dispatch) => {
        try {
            dispatch({
                type: SET_IS_FETCHING,
                payload: true
            })

            const result = await axios.get(`https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&per_page=${perPage}&page=${currentPage}`)
            dispatch({
                type: SET_REPOS,
                payload: result.data
            })
            dispatch({
                type: SET_IS_FETCHING,
                payload: false
            })
        } catch (e) {
            dispatch({
                type: SET_FETCH_ERROR,
                payload: true
            })

            dispatch({
                type: SET_IS_FETCHING,
                payload: false
            })
            setTimeout(dispatch({
                    type: SET_FETCH_ERROR,
                    payload: false
                }),2000)
        }

    }
}

export const setFetching = (bool) => {
    return (dispatch) => {
        dispatch({
            type: SET_IS_FETCHING,
            payload: bool
        })
    }
}

export const setCurrentPage = (number) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: number
    }
}

export const gitCurrentRepos = async (userName , repoName , setRepo) => {
    try {
        const result = await axios.get(`https://api.github.com/repos/${userName}/${repoName}`)
        setRepo(result.data)
    } catch (e) {
        setRepo('Error')
    }

}

export const setContributs = async (userName , repoName , setContributors) => {
    try {
        const result = await axios.get(`https://api.github.com/repos/${userName}/${repoName}/contributors?page=1&per_page=10`)
        setContributors(result.data)
    } catch (e) {
        setContributors('Error')
    }

}

export const setFetchError = (bool) => {
    return {
        type: SET_FETCH_ERROR,
        payload: bool
    }
}