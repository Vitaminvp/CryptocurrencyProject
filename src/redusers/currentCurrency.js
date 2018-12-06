import { CURRENTCURRENCY } from '../constants';

const initialCurrentCurrency = '';


export default (currentCurrency = initialCurrentCurrency, action) => {
    const {type, payload} = action;
    switch (type) {
        case CURRENTCURRENCY: return payload;
        default: return currentCurrency;
    }
}
