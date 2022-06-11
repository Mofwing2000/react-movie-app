import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';

import apiConfig from '../../api/apiConfig';
import { showTrailer } from '../TrailerModal/index.js';
import { getWatchListByUserId,db } from '../../config/firebase';
import { addToList, removeFromList } from '../../actions/watchList';

import noImg from '../../assests/img/no_img.png';
import './movieCard.scss';

const MovieCard = (props) => {

    const { movie, category } = props;
    const addRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let isAdded = false;

    const {currentUser} = useSelector(state => state.user);
    const {currentList} = useSelector(state => state.list);

    const addToWatchList = () => {
        if(isAdded){
            if(currentUser){
                handleRemove()
            }
            else    return
        }
        else{
            if(currentUser){
                handleAdd()
            }
            else    return
        }
    }

    const handleAdd =async () =>{
        try{
            getWatchListByUserId(currentUser.id)
                .then(async(result) => {
                    const listRef = doc(db, "watchLists", result.id);
                    try{
                        await updateDoc(listRef, {
                            watchList: 
                                [...result.data().watchList, 
                                    {
                                        id: movie.id,
                                        category
                                    }
                                ]
                        });
                    }
                    catch(error){
                        console.log(error);
                    }
                })
                .then(()=> dispatch(addToList(movie.id,category)));
            
                
        }
        catch(error){
            console.log(error)
        }
    }

    const handleRemove =async () =>{
        try{
            getWatchListByUserId(currentUser.id)
                .then(async(result) => {
                    const newList = [...result.data().watchList];
                    const index = newList.findIndex(item => (item.id == movie.id && item.category === category));
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
                .then(()=> dispatch(removeFromList(movie.id,category)));
                
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        //const item = 
        isAdded = currentList.some(item => (item.id == movie.id && item.category === category));
        if(isAdded){
            addRef.current.style.color='#ff0000';
        }
        else{
            addRef.current.style.color='unset';
        }
    },[currentList])

    return (
        <div className='movie-card'>
            <div className='movie-card__poster'>
                <img src={apiConfig.w500Image(movie.poster_path || movie.backdrop_path) !== 'https://image.tmdb.org/t/p/w500/null' ? apiConfig.w500Image(movie.poster_path || movie.backdrop_path) : noImg} 
                    alt='' 
                />
                <div className='movie-card__poster__action'>
                    <i className='bx bxs-right-arrow movie-action__icon'
                        onClick={() => navigate(`../${category}/detail/${movie.id}`)}
                    ></i>
                    <i className='bx bxl-youtube movie-action__icon'
                        onClick={() => showTrailer(movie.id, category)}
                    ></i>
                    <i className='bx bxs-heart movie-action__icon' ref={addRef}
                        onClick={() => addToWatchList(movie.id, category)}
                    ></i>
                </div>
            </div>
            <Link
                to={`/${category}/detail/${movie.id}`}
                className='movie-card__title'
            >
                <p>{movie.title || movie.original_title || movie.original_name}</p>
            </Link>
        </div>
    )
}

export default MovieCard;
