import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import tmdbApi from '../../api/tmdbApi';
import TVEpisodes from '../../components/TVEpisodes';
import MovieListSlide from '../../components/MovieListSlide';
const View = () => {

    const { category, id, episodeId } = useParams();
    const [curSeason, setCurSeason] = useState(null);
    const [curEps, setCurEps] = useState(null);
    const [item, setItem] = useState(null);

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

    return (
        <div className='view container'>
            {
                item && (
                    <>
                        <div style={{ height: "500px", marginTop: '300px', textAlign: 'center' }}>
                            Not available now!!!
                        </div>
                        {category === 'tv' && (
                            <TVEpisodes
                                item={item}>
                            </TVEpisodes>
                        )}
                        <div className='view__similar'>
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
        </div>
    )
}

export default View;