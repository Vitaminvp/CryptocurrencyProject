import { SETLIST, ADDTOLIST, DELFROMLIST } from '../constants';

const initialSetList = [];

export default (coinsList = initialSetList, action) => {
    const {type, payload} = action;
    switch (type) {
        case SETLIST: return (payload instanceof Array) ? [...payload] : [payload];
        case ADDTOLIST: return [...coinsList, payload];
        case DELFROMLIST: return [...payload];
        default: return coinsList;
    }
}