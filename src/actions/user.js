import {SIGNUP_FAIL, SIGNUP_SUCCEED, SIGNUP_START, 
    LOGIN_FAIL, LOGIN_SUCCEED, LOGIN_START, 
    LOGOUT_START, LOGOUT_SUCCEED, LOGOUT_FAIL} from "../constants/user"

export const signupStart = () => (
    {
        type : SIGNUP_START,
    }
)

export const signupSucceed = (user) => (
    {
        type: SIGNUP_SUCCEED,
        payload: user
    }
)


export const signupFail = (error) => (
    {
        type: SIGNUP_FAIL,
        payload: error
    }
)

export const loginStart = () => (
    {
        type : LOGIN_START,
    }
)

export const loginSucceed = (user) => (
    {
        type: LOGIN_SUCCEED,
        payload: user
    }
)

export const loginFail = (error) => (
    {
        type: LOGIN_FAIL,
        payload: error
    }
)

export const logoutStart = () => (
    {
        type : LOGOUT_START,
    }
)

export const logoutSucceed = () => (
    {
        type: LOGOUT_SUCCEED,
    }
)

export const logoutFail = (error) => (
    {
        type: LOGOUT_FAIL,
        payload: error
    }
)

// export const signup = (email, password, userName) => {
//     return funcs
// }
