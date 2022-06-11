import userReducer from "./user";

import {combineReducers} from 'redux';
import watchListReducer from "./watchList";

const rootReducer =  combineReducers({
    user: userReducer,
    list: watchListReducer
});

export default rootReducer;