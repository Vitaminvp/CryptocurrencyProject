import { FILTEREDCOINSLIST } from '../constants';

const initialFilteredSetList = [];

export default (filteredCoinsList = initialFilteredSetList, action) => {
    const {type, payload} = action;
    switch (type) {
        case FILTEREDCOINSLIST: return payload;

        default: return filteredCoinsList;
    }
}