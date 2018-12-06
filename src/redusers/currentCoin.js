import { CURRENTCOIN } from '../constants';

const initialValue = '';


export default (list = initialValue, action) => {
    const {type, payload} = action;
    switch (type) {
        case CURRENTCOIN: return payload;
        default: return list;
    }
}