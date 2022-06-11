import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { signOut, onAuthStateChanged } from 'firebase/auth';

import auth, { getUserByEmail, getWatchListByUserId } from '../../config/firebase';
import { getList } from '../../actions/watchList';
import tmdbApi from '../../api/tmdbApi';
import { logoutFail, logoutStart, logoutSucceed, loginSucceed } from '../../actions/user';

import './headerAction.scss';

const HeaderAction = () => {

  const searchIconRef = useRef();
  const searchBarRef = useRef();
  const searchResRef = useRef();
  const [searchVal, setSearchVal] = useState('');
  const [searchRes, setSearchRes] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        getUserByEmail(userAuth.email)
          .then(result => {
            getWatchListByUserId(result.id)
              .then(result => dispatch(getList(result.data().watchList)))
            const user = {
              id: result.id,
              ...result.data()
            };
            dispatch(loginSucceed(user));
            console.log(user);
          });
      }
    });
  }, []);

  useEffect(() => {
    const get = async () => {
      const params = {
        page: 1,
        query: searchVal
      }
      try {
        if (searchVal) {
          const result = await tmdbApi.search({ params });
          setSearchRes(result.results.splice(0, 10));
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    get();
  }, [searchVal])

  const handleOnBlur = (e) => {
    setTimeout(() => {
      searchResRef.current.classList.remove('active');
    }, 200)

  }

  const handleFocus = () => {

    searchResRef.current.classList.add('active');
  }

  const handleLogout = () => {
    dispatch(logoutStart());
    signOut(auth).then(() => {
      dispatch(logoutSucceed());
    }).catch((error) => {
      dispatch(dispatch(logoutFail(error)));
    });
  }

  const handleSearchClick = (e) => {
    searchBarRef.current.classList.add('active');
    searchBarRef.current.focus();

    if (searchVal === '') {
      return;
    }
    else {
      searchResRef.current.classList.remove('active');
      navigate(`../search/${searchVal}`);
      setSearchVal('');
    }
  }

  return (
    <div className='header__action'>
      <div className='header__search'>
        <input type="text"
          className='search__bar'
          placeholder='Search movies,tvs...'
          onBlur={handleOnBlur}
          ref={searchBarRef}
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          onFocus={handleFocus}
        />
        <i className='bx bx-search search__icon'
          ref={searchIconRef}
          onClick={handleSearchClick}
          onMouseDown={e => e.preventDefault()}
        ></i>
        <ul className='search__results'
          ref={searchResRef}
        >
          {
            searchVal ?
              (
                searchRes && searchRes.length !== 0 ?
                  (!searchRes.some(result => (result.media_type === 'movie' || result.media_type === 'tv')) ?
                    (
                      <p>No result!</p>
                    ) :
                    (
                      searchRes.map((result, index) => {
                        if (result.media_type === 'movie' || result.media_type === 'tv') {
                          return (
                            <li key={index} className='search__results__item'>
                              <Link
                                to={`../${result.media_type}/detail/${result.id}`}
                                onClick={() => { setSearchVal('') }}
                              >
                                <p>{result.title || result.original_title || result.original_name}</p>
                              </Link>
                            </li>
                          )
                        }
                        else return;
                      }
                      )
                    )
                  ) :
                  (
                    <p>No result!</p>
                  )
              ) :
              (
                <p>No result!</p>
              )
          }
        </ul>
      </div>
      <div className='user__action'>
        <i className='bx bx-user user__icon' ></i>
        <div className='action__list'>
          {currentUser ? (
            <>
              <span className='user-name'>{currentUser.userName}</span>
              <span className='manage-account'>
                <Link to='../manage-acount'>
                  Manage account
                </Link>
              </span>
              <span className='view-watchlist'>
                <Link to='../watch-list'>
                  View watchlist
                </Link>
              </span>
              <button className='btn--logout'
                onClick={handleLogout}
              >Log out
              </button>
            </>

          ) :
            (
              <span>
                <Link to='/login'>
                  Đăng nhập
                </Link>
              </span>
            )}
        </div>
      </div>
    </div>
  )
}

export default HeaderAction