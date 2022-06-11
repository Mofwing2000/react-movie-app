import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";

import './tvEpisode.scss';
const TVEpisodes = (props) => {

    const { item } = props;
    const [curSeason, setCurSeason] = useState(1);
    const [tvSeason, setTvSeason] = useState([]);

    useEffect(() => {
        const get = async () => {
            try {
                const result = await tmdbApi.tvSeason(item.id, curSeason);
                setTvSeason(result);
            }
            catch (error) {
                console.log(error);
            }
        }
        get();
    }, [item, curSeason])

    return (
        item && (
            <div className="episodes-box container">
                <div className="episodes-box__season">
                    <i className='bx bx-list-ul'></i>
                    <span className="episodes-box__season__label">
                        Season {curSeason}
                    </span>
                    <i className='bx bxs-down-arrow' ></i>
                    <ul className="episodes-box__season__dropdown">
                        {item.seasons && item.seasons.map((season, index) =>
                            season.season_number !== 0 && (
                                <li className={season.season_number === curSeason ? 'active' : ''}
                                    key={index}
                                    onClick={() => setCurSeason(season.season_number)}>
                                    Season {season.season_number}
                                </li>
                            ))}
                    </ul>
                </div>
                {
                    tvSeason.length !== 0 && (
                        <div className="episodes-box__episodes">
                            <ul>
                                {tvSeason.episodes.map((episode, index) => (
                                    <li key={index} className="episodes-box__episodes__item">
                                        <NavLink
                                            to={`../tv/view/${item.id}/season-${curSeason}.${episode.id}`}
                                        >
                                            <span className="episodes-box__episodes__item__number">Eps {episode.episode_number}:</span>
                                            <span className="episodes-box__episodes__item__title">{episode.name}</span>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                }
            </div>
        )
    )
}
export default TVEpisodes;
