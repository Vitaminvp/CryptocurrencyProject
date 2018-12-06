import { SETCLIST, ADDTOCLIST } from '../constants';

const initialSetCList = [];

export default (currencyList = initialSetCList, action) => {
    const {type, payload} = action;
    switch (type) {
        case SETCLIST: return (payload instanceof Array) ? [...payload] : [payload];
        case ADDTOCLIST: return [...currencyList, payload];
        default: return currencyList;
    }
}