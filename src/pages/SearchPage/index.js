import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import tmdbApi from "../../api/tmdbApi";
import MovieCard from "../../components/MovieCard";
import Pagination from "../../components/Pagination";
import TrailerModal from "../../components/TrailerModal";

import './searchPage.scss';

const SearchPage = () => {

    const {keyword,page} = useParams();
    const [totalPages, setTotalPages] = useState(-1);
    const [list, setList] = useState([]);

    const pageNumber = page ? Number.parseInt(page) : 1;

    useEffect(() => {
        const get = async () => {
            const params = {
                page: pageNumber,
                query: keyword
            }

            try{
                const res = await tmdbApi.search({params});
                setTotalPages(res.total_pages)
                setList(res.results);
            }
            catch(error){
                console.log(error);
            }
            
        }

        get();
    },[keyword,page])

    return(
        <div className="search-page container">
            <h2 className="search-page__title">
                Search results for <span>{keyword}</span>
            </h2>
            <div className="search-page__list">
                {list.map((item,index) => (
                    (item.media_type==='tv' || item.media_type==='movie') &&
                    <div 
                        className="search-page__list__item" 
                        key={index}
                    >
                        <MovieCard
                            movie = {item}
                            category = {item.media_type}
                        >
                        </MovieCard>
                    </div>
                ))}
            </div>
            <Pagination
                totalPages={totalPages}
                curPage = {pageNumber}
            >
            </Pagination>
            <TrailerModal/>
        </div>
    )
}

export default SearchPage;