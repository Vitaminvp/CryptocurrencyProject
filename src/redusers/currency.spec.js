import currency from './currencyAll';
import {  CURRENCY } from '../constants';

const initialCurrency = [
    {Name: 'USD', Id: '0'},
    {Name: 'EUR', Id: '1'},
    {Name: 'UAH', Id: '2'},
    {Name: 'RUB', Id: '3'}
];

describe('Search reducers', () => {
    test('should return the initial state', () => {
        expect(currency(undefined, {})).toEqual(initialCurrency);
    });

    test('should handle SEARCH_COINS', () => {
        expect(
            currency({ currency: '' }, {
                type: CURRENCY,
                payload: ['test']
            }),
        ).toEqual( ['test'] );

        expect(
            currency({ currency: 'initial state' }, {
                type: CURRENCY,
                payload: 'test2',
            }),
        ).toEqual(['test2']);
    });
});