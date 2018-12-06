import { INCREMENT } from '../constants';

const initialCount = 0;

export default (count =  initialCount, action) => {
    const {type} = action;
    switch (type) {
        case INCREMENT: return count + 1;
        default: return count;
    }
}