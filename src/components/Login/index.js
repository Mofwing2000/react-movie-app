import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from "firebase/auth";

import { loginStart, loginSucceed, loginFail } from '../../actions/user';
import auth, { getUserByEmail,getWatchListByUserId } from '../../config/firebase';
import { getList } from '../../actions/watchList';

import './login.scss';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailErrRef = useRef();
  const passwordErrRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();  
  
    validateEmailVal(email);
    validatePasswordVal(password);
    
    if(emailErrRef.current.innerText.length==0 && passwordErrRef.current.innerText.length==0){
      login(email, password);
      setEmail('');
      setPassword('');
    }
  }

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate])

  const login = (email, password) => {
    dispatch(loginStart());
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        getUserByEmail(email)
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
      })
      .catch(error => dispatch(loginFail(error)));
  };

  const validateEmailVal = (value) => {
    let isValid = true;
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;      
    if(!mailformat.test(value)){
      emailErrRef.current.innerText = 'Please enter your email!';
      isValid = false;
    }

    return isValid;
  }

  const handleEmailOnBlur = (e) => {
    validateEmailVal(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleEmailOnInput = () => {
    emailErrRef.current.innerText = '';
  }

  const validatePasswordVal = (value) => {
    let isValid = true;
    if(value.length < 6){
      passwordErrRef.current.innerText = 'Please re-enter your password';
      isValid=false;
    }

    return isValid;
  }

  const handlePasswordOnBlur = (e) => {
    validatePasswordVal(e.target.value);
  }
  
  const handlePasswordOnInput = () => {
    passwordErrRef.current.innerText = '';
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  return (
    <div className='login__container'>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='label' htmlFor='email'>Email:</label>
          <input
            id='email'
            type='text'
            onChange={handleEmailChange}
            onBlur={handleEmailOnBlur}
            onInput = {handleEmailOnInput}
            value={email}
          />
          <span 
            className='error' 
            ref={emailErrRef}
          ></span>
        </div>
        <div>
          <label className='label' htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            onChange={handlePasswordChange}
            onBlur = {handlePasswordOnBlur}
            onInput = {handlePasswordOnInput}
            value={password}
          />
          <span 
            className='error' 
            ref={passwordErrRef}
          ></span>
        </div>
        <Link
          className='signup-redirect'
          to='/signup'
        >
          Don't have an account?
        </Link>
        <button className='login__btn'>Log in</button>
      </form>
    </div>
  )
}
export default Login