import { ADD_TO_LIST, REMOVE_FROM_LIST, GET_LIST
} from "../constants/watchList";


export const addToList = (id, category) => (
    {
        type : ADD_TO_LIST,
        payload : {
            id,
            category
        }
    }
)

export const removeFromList = (id, category) => (
    {
        type : REMOVE_FROM_LIST,
        payload : {
            id,
            category
        }
    }
)

export const getList = (list) => (
    {
        type : GET_LIST,
        payload: list
    }
)