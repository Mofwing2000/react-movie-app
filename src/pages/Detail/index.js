import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import MovieListSlide from '../../components/MovieListSlide';
import TrailerModal, { showTrailer } from '../../components/TrailerModal';
import TVEpisodes from '../../components/TVEpisodes';
import MovieDetail from '../../components/MovieDetail';

import './detail.scss';

const Detail = () => {

    const { category, id } = useParams();
    const episodesRef = useRef();
    const [item, setItem] = useState();

    useEffect(() => {
        const get = async () => {
            try {
                const res = await tmdbApi.detail(id, category);
                setItem(res);
            }
            catch (error) {
                console.log(error);
            }
        }
        get();

    }, [category, id])

    const scrollEpisodes = () => {

        if (episodesRef.current) {
            episodesRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }

    }



    return (
        <div className='detail container'>
            {
                item && (
                    <>
                        <div className='detail__banner' style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }}>
                            <div className='detail__banner__icon'>
                                {
                                    category === 'movie' && (
                                        <Link to={`../movie/view/${item.id}`}>
                                            <i className='bx bx-play'>
                                            </i>
                                        </Link>
                                    )}
                                {
                                    category === 'tv' && (
                                        <i className='bx bx-play' onClick={scrollEpisodes}></i>
                                    )
                                }
                            </div>
                        </div>
                        <div className='detail__info'>
                            <MovieDetail
                                id={id}
                                category={category}
                                item={item}>
                            </MovieDetail>
                        </div>
                        {
                            category === 'tv' && (
                                <div ref={episodesRef}>
                                    <TVEpisodes item={item} ></TVEpisodes>
                                </div>
                            )
                        }
                        <div className='detail__similar'>
                            <MovieListSlide
                                slideTitle='You may also like:'
                                slideCate='similar'
                                similarCate={category}
                                similarId={id}
                                slidePlayEffect={true}
                            ></MovieListSlide>
                        </div>
                    </>
                )
            }
            <TrailerModal></TrailerModal>
        </div>
    )
}

export default Detail;