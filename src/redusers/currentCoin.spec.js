import value from './currentCoin';
import { CURRENTCOIN } from '../constants';

describe('Search reducers', () => {
    test('should return the initial state', () => {
        expect(value(undefined, {})).toEqual('');
    });
    test('should handle CURRENT', () => {
        expect(
            value('', {
                type: CURRENTCOIN,
                payload: 'test',
            }),
        ).toEqual('test');
        expect(
            value({ value: 'initial state' }, {
                type: CURRENTCOIN,
                payload: 'test2',
            }),
        ).toEqual('test2');
    });
});