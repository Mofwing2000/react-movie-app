import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import tmdbApi, { category, } from '../../api/tmdbApi';
import MovieCard from '../MovieCard';

import './movieListSlide.scss'

const MovieListSlide = props => {

    SwiperCore.use([Autoplay]);

    const [moviesList, setMoviesList] = useState([]);
    const { slideTitle, slideType, slideCate, similarCate, similarId, slidePlayEffect } = props;

    useEffect(() => {
        const getMovies = async () => {
            const params = {
                page: 1
            }
            if (slideCate === category.movie) {
                try {
                    const response = await tmdbApi.getMoviesList(slideType, { params });
                    setMoviesList(response['results'].slice(0, 20));
                }
                catch (error) {
                    console.log(error);
                }

            }
            else if (slideCate === category.tv) {
                try {
                    const response = await tmdbApi.getTvList(slideType, { params });
                    setMoviesList(response['results'].slice(0, 20));
                }
                catch (error) {
                    console.log(error);
                }
            }
            else if (slideCate === 'similar') {
                try {
                    const response = await tmdbApi.similar(similarCate, similarId);
                    setMoviesList(response['results'].slice(0, 20));
                }
                catch (error) {
                    console.log(error);
                }
            }

        }
        getMovies();
    }, [])
    console.log(moviesList);
    return (
        <div className='list-slider container'>
            <div className='list-slider--top'>
                <h3 className='list-slider--top__title'>{slideTitle}</h3>
                {slideCate !== 'similar' && (
                    <Link
                        className='list-slider--top__more'
                        to={`/${slideCate}/type/${slideType}`}
                    >
                        View more
                    </Link>
                )}
            </div>
            <Swiper
                grabCursor={true}
                spaceBetween={20}
                slidesPerView={'auto'}
                autoplay={slidePlayEffect && {
                    delay: 3000,
                    disableOnInteraction: false,
                }}
            >
                {moviesList.map((movie, index) => (
                    <SwiperSlide
                        className='list-slider__item'
                        key={index}
                    >
                        <MovieCard movie={movie} category={slideCate === 'similar' ? similarCate : slideCate} />
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}

export default MovieListSlide