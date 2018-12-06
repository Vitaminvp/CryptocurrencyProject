import current from './currentCurrency';
import { CURRENTCURRENCY } from '../constants';

describe('Search reducers', () => {
    test('should return the initial state', () => {
        expect(current(undefined, {})).toEqual('');
    });
    test('should handle CURRENT', () => {
        expect(
            current('', {
                type: CURRENTCURRENCY,
                payload: 'test',
            }),
        ).toEqual('test');
        expect(
            current({ current: 'initial state' }, {
                type: CURRENTCURRENCY,
                payload: 'test2',
            }),
        ).toEqual('test2');
    });
});