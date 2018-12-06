import current from './currentCurrency';
import { CURRENT } from '../constants';

describe('Search reducers', () => {
    test('should return the initial state', () => {
        expect(current(undefined, {})).toEqual('');
    });
    test('should handle CURRENT', () => {
        expect(
            current('', {
                type: CURRENT,
                payload: 'test',
            }),
        ).toEqual('test');
        expect(
            current({ current: 'initial state' }, {
                type: CURRENT,
                payload: 'test2',
            }),
        ).toEqual('test2');
    });
});