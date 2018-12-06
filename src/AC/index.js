import { INCREMENT, CURRENCY, CURRENTCURRENCY, CURRENTCOIN, SETLIST, FILTEREDCOINSLIST, ADDTOLIST, ADDTOCLIST, SETCLIST,
    ERROR_COINS_LIST, RECEIVE_COINS_LIST, REQUEST_COINS_LIST  } from '../constants';
import {CRYPTO_COMPARE_URL_ALL} from '../constants';
import {COINS_NUM} from '../constants';

export function increment(data) {
    return {
        type: INCREMENT,
        payload: data
    }
}
export function setCurrencyNameAll(data) {
    return {
        type: CURRENCY,
        payload: data
    }
}
export function setCurrentCurrency(data) {
    return {
        type: CURRENTCURRENCY,
        payload: data
    }
}
export function setCurrentCoin(data) {
    return {
        type: CURRENTCOIN,
        payload: data
    }
}
export function setCoinsList(data) {
    return {
        type: SETLIST,
        payload: data
    }
}
export function setFilteredCoinsList(data) {
    return {
        type: FILTEREDCOINSLIST,
        payload: data
    }
}
export function addToCoinsList(data) {
    return {
        type: ADDTOLIST,
        payload: data
    }
}

export function setCurrencyList(data) {
    return {
        type: SETCLIST,
        payload: data
    }
}
export function addToCurrencyList(data) {
    return {
        type: ADDTOCLIST,
        payload: data
    }
}

// export const boundIncrement = data => dispatch => dispatch(increment(data));

export const requestCoinsListAction = () => ({
    type: REQUEST_COINS_LIST
});

export const receiveCoinsListAction = coins => ({
    type: RECEIVE_COINS_LIST,
    payload: coins
});

export const errorCoinsListAction = (err) => ({
    type: ERROR_COINS_LIST,
    payload: err
});

export const getCoinsList = () => (dispatch) => {
    dispatch(requestCoinsListAction());
        fetch(CRYPTO_COMPARE_URL_ALL)
            .then(responce => responce.json())
            .then(responce => dispatch(receiveCoinsListAction(Object.keys(responce.Data).slice(0, COINS_NUM).map(key => responce.Data[key]))))
            .catch(err => dispatch(errorCoinsListAction(err)));
};