import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SwiperCore, { Autoplay, EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import apiConfig from '../../api/apiConfig';
import tmdbApi, { category, movieType} from '../../api/tmdbApi'
import {showTrailer} from '../TrailerModal';

import './heroSlider.scss';

const HeroSlider = () => {

    SwiperCore.use([Autoplay, Pagination, EffectFade]);

    const [moviesList, setMoviesList] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = {
                page: 1
            }
            try{
                const response = await tmdbApi.getMoviesList(movieType.popular,{params});
                setMoviesList(response.results.splice(0,5))
            } 
            catch(error){
                console.log(error);
            }                                                   
        }
        getMovies();
    }, [])

    return (
        <div className='hero-slider'>
            <Swiper
                className="mySwiper"
                modules={[Autoplay, EffectFade, Pagination]}
                effect={'fade'}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                loop={true}
                pagination={{
                    dynamicBullets: true
                }}
                autoHeight={true}
            //navigation={true}
            >
                {moviesList.map((movie, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <HeroSliderItem
                                movie={movie}
                                className={isActive ? 'active' : ''}
                            />
                        )}

                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

const HeroSliderItem = (props) => {
    const navigate = useNavigate();
    const movie = props.movie;
    const background = apiConfig.originalImage(movie.backdrop_path || movie.poster_path);
    return (
        <div
            className={`hero-slider__item ${props.className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className='hero-slider__item__content container'>
                <div className='hero-slider__item__content__poster'>
                    <img src={apiConfig.w500Image(movie.poster_path)} alt=''></img>
                </div>
                <div className='hero-slider__item__content__info'>
                    <h2 className='title'>{movie.title||movie.original_title}</h2>
                    <div className={`score ${ratingColor(movie.vote_average)}`} >{movie.vote_average}</div>
                    <div className='overview'>{movie.overview}</div>
                    <div className='actions'>
                        <button 
                            className='btn btn-view' 
                            onClick={() => {
                                navigate(`movie/detail/${movie.id}`)
                            }}
                        >
                            Watch now
                        </button>
                        <button 
                            className='btn btn-trailer'
                            onClick={() => showTrailer(movie.id, category.movie)}
                        >
                            Watch trailer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ratingColor = (rating) => {
    if (rating <= 4.5) {
        return 'bad';
    }
    else if (rating <= 7.5) {
        return 'average';
    }
    else return 'good'
}


export default HeroSlider;