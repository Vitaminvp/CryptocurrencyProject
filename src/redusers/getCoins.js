import { RECEIVE_COINS_LIST, REQUEST_COINS_LIST, ERROR_COINS_LIST } from '../constants';

const initialState = {
    coins: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_COINS_LIST:
            return {
                ...state,
                coins: []
            };
        case RECEIVE_COINS_LIST:
            return {
                ...state,
                coins: action.payload
            };
        case ERROR_COINS_LIST:
            return {
                ...state,
                coins: []
            };
        default:
            return state;
    }
}