import { RECEIVE_CURRENCY_LIST, REQUEST_CURRENCY_LIST, ERROR_CURRENCY_LIST } from '../constants';

const initialState = {
    currencyRate: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_CURRENCY_LIST:
            return {
                ...state,
                currencyRate: {}
            };
        case RECEIVE_CURRENCY_LIST:
            return {
                ...state,
                currencyRate: {...action.payload}
            };
        case ERROR_CURRENCY_LIST:
            return {
                ...state,
                currencyRate: {}
            };
        default:
            return state;
    }
}