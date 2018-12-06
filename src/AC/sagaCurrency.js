import { REQUEST_CURRENCY_LIST, RECEIVE_CURRENCY_LIST, ERROR_CURRENCY_LIST, CRYPTO_COMPARE_URL_CUR } from "../constants";
import { takeEvery, call, put } from 'redux-saga/effects';

export const requestCurrencyListAction = (currensyNames, nameToUpper) => ({
    type: REQUEST_CURRENCY_LIST,
    currensyNames,
    nameToUpper
});

export const receiveCurrencyListAction = currencyRate => ({
    type: RECEIVE_CURRENCY_LIST,
    payload: currencyRate,
});

export const errorCurrencyListAction = (err) => ({
    type: ERROR_CURRENCY_LIST,
});

export function* getCurrencyList(action) {
    try {
        const responce = yield call(
            () => fetch(`${CRYPTO_COMPARE_URL_CUR}${action.nameToUpper}&tsyms=${action.currensyNames}`).then(responce => responce.json()),
        );
        yield put(receiveCurrencyListAction(responce['RAW'][action.nameToUpper]));
    } catch (err) {
        yield put(errorCurrencyListAction(err));
    }
};

export default function* currencySaga() {
    yield takeEvery(REQUEST_CURRENCY_LIST, getCurrencyList);
}