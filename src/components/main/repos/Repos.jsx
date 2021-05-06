import React from "react";
import './repos.less'
import {NavLink} from "react-router-dom";

const Repos = ({repos}) => {
    return (
        <div className={'repo'}>
            <div className={'repo-header'}>
                <h2
                    className={'repo-header-name'}
                >
                    <NavLink to={`/card/${repos.owner.login}/${repos.name}`} className={'repo-header-link'}>
                        {repos.name}
                    </NavLink>
                </h2>
                <div className={'repo-header-stars'}>{repos.stargazers_count}</div>
            </div>
            <div className={'repo-last-commit'}>{repos.updated_at}</div>
            <a target={'_blank'} href={repos.html_url} className={'repo-link'}>Ссылка на репозиторий</a>
        </div>
    )
}

export default Repos