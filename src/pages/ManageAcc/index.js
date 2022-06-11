import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";

import auth, { db } from "../../config/firebase";
import { getUserByEmail } from "../../config/firebase";
import { loginStart, loginSucceed, loginFail } from "../../actions/user";

import './manageAcc.scss';

const ManageAcc = () => {
    const dispatch = useDispatch();
    const messPassRef = useRef();
    const passwordRef = useRef();
    const { currentUser } = useSelector(state => state.user)

    const [user, setUser] = useState({
        id: '',
        email: '',
        password: '',
        userName: ''
    });

    useEffect(() => {
        if (currentUser)
            setUser(currentUser);
    }, [currentUser])

    const handleOnBlur = (e) => {
        if (e.target.value.length < 6) {
            messPassRef.current.classList.add('active');
        }
        else {
            messPassRef.current.classList.remove('active');
        }
    }

    const handleInput = (e) => {
        if (e.target.value.length < 6) {
            messPassRef.current.classList.add('active');
        }
        else {
            messPassRef.current.classList.remove('active');
        }
    }

    const validAll = () => {
        if (passwordRef.current.length < 6) return false;

        return false;
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (validAll) {
            changePassword(user.password);
        }
        else return;
    }

    const changePassword = async (password) => {
        const user = auth.currentUser;
        const email = user.email;

        try {
            try {
                await updatePassword(user, password);
            }
            catch (error) {
                console.log(error);
            }
            const userRef = doc(db, "users", currentUser.id);
            try {
                await updateDoc(userRef, {
                    password: password
                });
            }
            catch (error) {
                console.log(error);
            }

            dispatch(loginStart());
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    getUserByEmail(email)
                        .then(result => {
                            const user = {
                                id: result.id,
                                ...result.data()
                            };
                            dispatch(loginSucceed(user));
                            console.log(user);
                        });
                })
                .catch(error => dispatch(loginFail(error)));
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="account container">
            <h3 className="account__title">Manage account:</h3>
            <p className="account__email">{user.email}</p>
            <form className="account__form">
                <div className='account__form__input'>
                    <label>
                        User name:
                    </label>
                    <input
                        type='text'
                        defaultValue={user.userName}
                        //onChange={()=>{}}
                        contentEditable={false}
                    />
                </div>
                <div className='account__form__input'>
                    <label>
                        Password:
                    </label>
                    <input
                        type='password'
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        onInput={handleInput}
                        onBlur={handleOnBlur}
                        ref={passwordRef}
                    />
                    <p className='account__form__input--warning' ref={messPassRef}>Choose another password!</p>
                </div>
                <button
                    className="account__form__button"
                    onClick={handleClick}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default ManageAcc;