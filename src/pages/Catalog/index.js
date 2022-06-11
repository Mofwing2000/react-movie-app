import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import tmdbApi, { category as categoryTMDB, movieType as movieTypeTMDB, tvType as tvTypeTMDB } from '../../api/tmdbApi';
import axiosClient from '../../api/axiosClient';
import MovieCard from '../../components/MovieCard';
import Pagination from '../../components/Pagination';
import TrailerModal from '../../components/TrailerModal';

import './catalog.scss';

function Catalog() {
    const [list, setList] = useState([]);
    const [totalPages, setTotalPages] = useState(-1);

    const { category, type, genre, page } = useParams();
    const pageNumber = page ? Number.parseInt(page) : 1;
    let title = '';

    if(category){
        title = type ? `${type.replace('_',' ')} ${category}` : category;
    }
    else if(genre){
        title = genre.replace('_',' ');
    }

    useEffect(() => {
        const getResults = async () => {
            const params = {
                page: pageNumber,
            }
            let response;
            if (category) {
                
                switch (category) {
                    case categoryTMDB.movie:
                        switch (type) {
                            case movieTypeTMDB.popular:
                                try{
                                    response = await tmdbApi.getMoviesList(movieTypeTMDB.popular, { params });
                                    setList(response.results);
                                    setTotalPages(response.total_pages);
                                    
                                }
                                catch {
                                    console.log('error');
                                }
                                break;
                            case movieTypeTMDB.latest:
                                try{
                                    response = await tmdbApi.getMoviesList(movieTypeTMDB.latest, { params });
                                    setList(response.results);
                                    setTotalPages(response.total_pages);
                                }
                                catch{
                                    console.log('error')
                                }
                                break;
                            case movieTypeTMDB.top_rated:
                                try{
                                    response = await tmdbApi.getMoviesList(movieTypeTMDB.top_rated, { params });
                                    setList(response.results);
                                    setTotalPages(response.total_pages);
                                }
                                catch{
                                    console.log('error');
                                }
                                break;
                            case movieTypeTMDB.upcoming:
                                try{
                                    response = await tmdbApi.getMoviesList(movieTypeTMDB.upcoming, { params });
                                    setList(response.results);
                                    setTotalPages(response.total_pages);
                                }
                                catch{
                                    console.log('error')
                                }
                                break;
                            default:
                                try{
                                    response = await tmdbApi.getMoviesList(movieTypeTMDB.popular, { params });
                                    setTotalPages(response.total_pages);
                                    setList(response.results);
                                }
                                catch{
                                    console.log('error')
                                }
                        }
                        // }
                        break;
                    case categoryTMDB.tv:
                        switch (type) {
                            case tvTypeTMDB.latest:
                                try{
                                    response = await tmdbApi.getTvList(tvTypeTMDB.latest, { params });
                                    setList(response.results);
                                    setTotalPages(response.total_pages);
                                }
                                catch{
                                    console.log('error')
                                }
                                break;
                            case tvTypeTMDB.popular:
                                try{
                                    console.log('asdfasdfas')
                                    response = await tmdbApi.getTvList('popular', { params });
                                    setList(response.results);
                                    setTotalPages(response.total_pages);
                                }
                                catch{
                                    console.log('error')
                                }
                                break;
                            case tvTypeTMDB.top_rated:
                                try{
                                    response = await tmdbApi.getTvList(tvTypeTMDB.top_rated, { params });
                                    setList(response.results);
                                    setTotalPages(response.total_pages);
                                }
                                catch{
                                    console.log('error')
                                }
                                break;
                            case tvTypeTMDB.on_air:
                                try{
                                    response = await tmdbApi.getTvList(tvTypeTMDB.on_air, { params });
                                    setList(response.results);
                                    setTotalPages(response.total_pages);
                                }
                                catch{
                                    console.log('error')
                                }
                                break;
                            default:
                                try{
                                    response = await tmdbApi.getTvList(tvTypeTMDB.popular, { params });
                                    setList(response.results);
                                    setTotalPages(response.total_pages);
                                }
                                catch{
                                    console.log('error')
                                }

                        }
                        break;
                    default:
                        setList([]);
                }
            }
            else if (genre) {
                try{
                    response =await tmdbApi.getGenreList(genre.replace('_',' '),{params})
                    setList(response.results);
                    setTotalPages(response.total_pages);
                }
                catch{
                    console.log('error');
                }
            }
            else
                response = [];
        }
        getResults();
    }, [category, type, genre, page])
    return (
        <div className='category container'>
            <h2 className='category__title'>{title}</h2>
            <div className='category__list'>
                {list.map((movie, index) => (
                    <div className='category__list__item' key={index}>
                        <MovieCard movie={movie} category={genre ? 'movie' : category} />
                    </div>
                ))}
            </div>
            <Pagination totalPages = {totalPages} curPage = {pageNumber}/>
            <TrailerModal/>
        </div>
    )
}

export default Catalog