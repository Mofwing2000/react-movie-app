import {
    SIGNUP_FAIL, SIGNUP_SUCCEED, SIGNUP_START,
    LOGIN_FAIL, LOGIN_SUCCEED, LOGIN_START,
    LOGOUT_START, LOGOUT_SUCCEED, LOGOUT_FAIL
} from "../constants/user";

const initialState = {
    currentUser: null,
    loading: false,
    error: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_START:
            return {
                ...state,
                loading: true
            }
        case SIGNUP_SUCCEED:
            return {
                ...state,
                loading: false,
                currentUser: action.payload
            }
        case SIGNUP_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case LOGIN_START:
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCEED:
            return {
                ...state,
                loading: false,
                currentUser: action.payload
            }
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case LOGOUT_START:
            return {
                ...state,
                loading: true
            }
        case LOGOUT_SUCCEED:
            return {
                ...state,
                loading: false,
                currentUser: null
            }
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;