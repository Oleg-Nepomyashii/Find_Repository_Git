import React, {useEffect, useState} from "react";
import './main.less'
import {gitRepos, setCurrentPage, setFetching} from "../../actions/gitActions";
import {useDispatch, useSelector} from "react-redux";
import Repos from "./repos/Repos";
import {createPages} from "../../utils/pagesCreator";
import {Redirect} from "react-router-dom";

const Main = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.repos.items)
    const isFetching = useSelector(state => state.repos.isFetching)
    const isFetchError = useSelector(state => state.repos.isFetchError)
    const currentPage = useSelector(state => state.repos.currentPage)
    const totalCount = useSelector(state => state.repos.totalCount)
    const perPage = useSelector(state => state.repos.perPage)
    const [searchValue , setSearchValue] = useState('')
    const pagesCount = Math.ceil(totalCount/perPage)
    const pages = []
    createPages(pages, pagesCount , currentPage)

    useEffect(() => {
        dispatch(gitRepos(searchValue , currentPage , perPage))
    }, [currentPage])

    return (
        <div>
            {
                isFetchError &&
                    <div className="alert alert-danger mt-3" role="alert">
                        Произошка ошибка! Пожалуйста обновите страницу
                    </div>
            }
            <div className={'search'}>
                <input
                    type="text"
                    placeholder={'Repository name'}
                    className={'search-input'}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button
                    disabled={isFetching}
                    className={'search-btn'}
                    onClick={() => {
                        dispatch(setCurrentPage(1))
                        dispatch(gitRepos(searchValue , currentPage))
                        setSearchValue('')
                    }}
                >Search</button>
            </div>
            {
                isFetching === false
                    ?
                        items.map(repos => {
                            return <Repos key={repos.id} repos={repos} />
                        })
                    :
                        <div className={'fetching'}>

                        </div>
            }
            <div className={'pages'}>
                {
                    pages.map((page , index) => {
                        return <button
                            key={index}
                            className={ currentPage == page ? 'current-page' :  'page'}
                            onClick={() => dispatch(setCurrentPage(page))}
                            disabled={isFetching}
                        >
                            {page}
                        </button>
                    })
                }
            </div>
        </div>
    )
};

export default Main