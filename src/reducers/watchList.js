import {
    ADD_TO_LIST, REMOVE_FROM_LIST, GET_LIST
} from "../constants/watchList";

const initialState = {
    currentList: [],
}

const watchListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST:
            return{
                ...state,
                currentList : [...action.payload]
            }
        case ADD_TO_LIST:
            return {
                ...state,
                currentList: [...state.currentList, action.payload]
            }
        case REMOVE_FROM_LIST:
            const newList = [...state.currentList];    
            const index = newList.findIndex(item => (item.id === action.payload.id && item.category === action.payload.category));
            newList.splice(index,1);
            return {
                ...state,
                loading: false,
                currentList: [...newList],
            }
            default:
                return state;
    }
} 

export default watchListReducer;