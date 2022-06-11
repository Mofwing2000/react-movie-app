import React, { useRef, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import { showTrailer } from "../TrailerModal";
import { addWatchList, db, getWatchListByUserId } from "../../config/firebase";
import { addToList,removeFromList } from "../../actions/watchList";

import './movieDetail.scss';

const MovieDetail = (props) => {

    const {id, item, category} = props;

    const addRef = useRef();
    let isAdded ;
    const {currentUser} = useSelector(state => state.user);
    const {currentList} = useSelector(state => state.list);
    const dispatch = useDispatch();

    useEffect(() => {
        isAdded = currentList.some(item => (item.id == id && item.category === category));
        if(isAdded){
            addRef.current.innerText = "Added to watchlist";
        }
        else{
            addRef.current.innerText='Add to watchlist';
        }
    },[currentList])

    const addToWatchList = () => {
        if(isAdded){
            if(currentUser){
                console.log('asfas');
                handleRemove(item.id, category)
            }
            else    return
        }
        else{
            if(currentUser){
                handleAdd(item.id, category)
            }
            else    return
        }
    }

    const handleAdd =async (id, category) =>{
        try{
            getWatchListByUserId(currentUser.id)
                .then(async(result) => {
                    const listRef = doc(db, "watchLists", result.id);
                    try{
                        await updateDoc(listRef, {
                            watchList: 
                                [...result.data().watchList, 
                                    {
                                        id,
                                        category
                                    }
                                ]
                        });
                    }
                    catch(error){
                        console.log(error);
                    }
                })
                .then(()=> dispatch(addToList(id,category)));
            
                
        }
        catch(error){
            console.log(error)
        }
    }

    const handleRemove =async (id, category) =>{
        try{
            getWatchListByUserId(currentUser.id)
                .then(async(result) => {
                    const newList = [...result.data().watchList];
                    const index = newList.findIndex(item => (item.id == id && item.category === category));
                    newList.splice(index, 1);
                    const listRef = doc(db, "watchLists", result.id);
                    try{
                        await updateDoc(listRef, {
                            watchList: [...newList]
                        });
                    }
                    catch(error){
                        console.log(error);
                    }
                })
                .then(()=> dispatch(removeFromList(id,category)));
                
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <div className='detail__main'>
            <img className='detail__main__poster' src={apiConfig.w500Image(item.poster_path || item.backdrop_path)} />
            <div className='detail__main__content'>
                <div className='detail__main__content__info'>
                    <h4 className='detail__main__content__info__title'>{item.title || item.original_title}</h4>
                    <div className='detail__main__content__info__top'>
                        <button onClick={() => showTrailer(id, category)}>
                            <i className='bx bxs-video'></i>
                            Watch trailer
                        </button>
                        <button style={{ backgroundColor: '#ffab00' }}>
                            <i className='bx bxl-imdb'></i>
                            {item.vote_average}
                        </button>
                    </div>
                    <div className='detail__main__content__info__overview'>
                        {item.overview}
                    </div>
                    <div className='detail__main__content__info__details'>
                        <div className='detail__main__content__info__details__first'>
                            <div className='detail__main__content__info__details__first__line'>
                                <span className='label'>Released: </span>
                                {item.release_date}
                            </div>
                            <div className='detail__main__content__info__details__first__line'>
                                <span className='label'>Genres: </span>
                                {item.genres.map(value => value.name).join(', ')}
                            </div>
                            <div className='detail__main__content__info__details__first__line'>
                                <span className='label'>Budget: </span>
                                ${item.budget}
                            </div>
                        </div>
                        <div className='detail__main__content__info__details__second'>
                            <div className='detail__main__content__info__details__second__line'>
                                <span className='label'>Duration: </span>
                                {item.runtime} mins
                            </div>
                            <div className='detail__main__content__info__details__second__line'>
                                <span className='label'>Country: </span>
                                {item.production_countries.map(value => value.name).join(', ')}
                            </div>
                            <div className='detail__main__content__info__details__second__line'>
                                <span className='label'>Production: </span>
                                {item.production_companies.map(value => value.name).join(', ')}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='detail__main__content__control'>
                    <button className='detail__main__content__control__button btn btn-watch'>
                        <i className='bx bxs-right-arrow'></i>
                        Watch now
                    </button>
                    <button 
                        className='detail__main__content__control__button btn btn-add'
                        ref={addRef}
                        onClick={addToWatchList}
                    >
                        Add to watchlist
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail;