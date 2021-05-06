import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {gitCurrentRepos , setContributs} from "../../actions/gitActions"
import './card.less'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

const Card = (props) => {
    const {username , reponame} = useParams()
    const [repo , setRepo] = useState({owner: {}})
    const [contributors , setContributors] = useState([])

    useEffect(() => {
        gitCurrentRepos(username,reponame , setRepo)
        setContributs(username,reponame , setContributors)
    }, [])

    return (
        <div>
            <button
                onClick={() => props.history.goBack()}
                className="back-btn"
            >
                BACK
            </button>
            {
                repo === 'Error'
                    ?
                        <div className="alert alert-danger mt-3" role="alert">
                            Произошка ошибка! Пожалуйста обновите страницу
                        </div>
                    :
                        <div className="card">
                            <img src={repo.owner.avatar_url} alt=""/>
                            <div className="name">{repo.name}</div>
                            <div className="stars"><FontAwesomeIcon color={'gold'} icon={faStar} />{repo.stargazers_count}</div>
                        </div>
            }

            {
                contributors === 'Error'
                    ?
                        <div className="alert alert-danger mt-3" role="alert">
                            При загрузке контрибуторов произошла ошибка
                        </div>
                    :
                        contributors.map((c , index) => {
                            return (
                                <div key={index}>
                                    {index + 1}.{c.login}
                                </div>
                            )
                        })
            }
        </div>
    );
};

export default Card;