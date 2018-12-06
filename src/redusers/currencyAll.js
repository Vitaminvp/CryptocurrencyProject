import { CURRENCY } from '../constants';

const initialCurrency = [
    {Name: 'USD', Id: '0'},
    {Name: 'EUR', Id: '1'},
    {Name: 'UAH', Id: '2'},
    {Name: 'RUB', Id: '3'}
];


export default (currencyAll = initialCurrency, action) => {
    const {type, payload} = action;
    switch (type) {
        case CURRENCY: return (payload instanceof Array) ? [...payload] : [payload];
        default: return currencyAll;
    }
}
