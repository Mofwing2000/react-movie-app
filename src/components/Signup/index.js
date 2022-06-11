import React, {useState, useRef, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {createUserWithEmailAndPassword} from "firebase/auth";

import { signupStart, signupSucceed, signupFail } from '../../actions/user';
import auth,{addUser, addWatchList, getUser, getWatchListByUserId} from '../../config/firebase';
import { getList } from '../../actions/watchList';

import './signup.scss';

const Signup = () => {

  const {currentUser} = useSelector(state => state.user);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');

  const emailRef = useRef();
  const emailErrRef = useRef();
  const userNameRef = useRef();
  const userNameErrRef = useRef();
  const passwordRef = useRef();
  const passwordErrRef = useRef();
  const confirmPasswordRef = useRef();
  const confirmPasswordErrRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if(currentUser){
      navigate('/');
    }
  },[currentUser, navigate])

  const signup = (email, password, userName) => {
    dispatch(signupStart());
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        addUser(email, password, userName)
          .then(docRef => {
            addWatchList(docRef.id)
              .then(() => 
                getWatchListByUserId(docRef.id)
                  .then(result => dispatch(getList(result.data().watchList))));
            getUser(docRef.id)
              .then(result => {
                const user= {
                  id: docRef.id,
                  ...result.data()
                };
                dispatch(signupSucceed(user));
                });
          });
      })
      .catch(error => dispatch(signupFail(error)));   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmailVal(email);
    validateUsrVal(userName);
    validatePasswordVal(password);
    validateConfirmPasswordVal(confirmPassword);
    if(emailErrRef.current.innerText.length===0
      && userNameErrRef.current.innerText.length===0
      && passwordErrRef.current.innerText.length===0
      && confirmPasswordErrRef.current.innerText.length===0){
        signup(email, password, userName);
        setEmail('');
        setUserName('');
        setPassword('');
        setConfirmPassword('');
      }
  }

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

  const validateUsrVal = (value) => {
    let isValid = true;     
    if(value.length <=0 ){
      userNameErrRef.current.innerText = 'Please enter username!';
      isValid=false;
    }

    return isValid;
  }

  const handleUsrOnBlur = (e) => {
    validateUsrVal(e.target.value);
  }

  const handleUsrChange = e => {
    setUserName(e.target.value);
  }

  const handleUsrOnInput = () => {
    userNameErrRef.current.innerText = '';
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
  
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  }

  const validateConfirmPasswordVal = (value) => {
    let isValid = true;
    if(value.length <6){
      isValid = false;
      confirmPasswordErrRef.current.innerText = 'Please enter this field';
    }
    if(value !== password){
      isValid = false;
      confirmPasswordErrRef.current.innerText = 'Not match with password';
    }

    return isValid;
  }

  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value);
  }


  const handleConfirmPasswordOnBlur = (e) => {
    validateConfirmPasswordVal(e.target.value);
    console.log('asf')
  }
  
  const handleConfirmPasswordOnInput = () => {
    confirmPasswordErrRef.current.innerText = '';
  }

  return (
    <div className='signup__container'>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='label' htmlFor='email'>Email:</label>
          <input 
            id='email' 
            type='text'
            value={email}
            onChange={handleEmailChange}
            onBlur = {handleEmailOnBlur}
            onInput = {handleEmailOnInput}
            ref={emailRef}
          />
          <span 
            className='error' 
            ref={emailErrRef}
          ></span>
        </div>
        <div>
          <label className='label' htmlFor='usr-name'>User name:</label>
          <input 
            id='usr-name' 
            type='text'
            value={userName}
            onChange={handleUsrChange}
            onBlur={handleUsrOnBlur}
            onInput={handleUsrOnInput}
            ref={userNameRef}
          />
          <span 
            className='error' 
            ref={userNameErrRef}
          ></span>
        </div>
        <div>
          <label className='label' htmlFor='password'>Password:</label>
          <input 
            ref={passwordRef}
            id='password' 
            type='password'
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordOnBlur}
            onInput = {handlePasswordOnInput}
          />
          <span 
            className='error' 
            ref={passwordErrRef}
          ></span>
        </div>
        <div>
          <label className='label' htmlFor='confirm-password'>Confirm password:</label>
          <input 
            ref={confirmPasswordRef}
            id='confirm-password' 
            type='password'
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur ={handleConfirmPasswordOnBlur}
            onInput = {handleConfirmPasswordOnInput}
          />
          <span 
            className='error' 
            ref={confirmPasswordErrRef}
          ></span>
        </div>
        <Link
          className='login-redirect'
          to='/login'
        >
          Already have an account?
        </Link>
        <button type='submit' className='signup__btn'>Sign up</button>
      </form>
    </div>
  )
}

export default Signup;