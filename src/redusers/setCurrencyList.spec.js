import setCList from './setCurrencyList';
import { SETCLIST } from '../constants';

describe('Search reducers', () => {
    test('should return the initial state', () => {
        expect(setCList(undefined, {})).toEqual([]);
    });
    test('should handle CURRENT', () => {
        expect(
            setCList('', {
                type: SETCLIST,
                payload: 'test',
            }),
        ).toEqual(['test']);
        expect(
            setCList({ setCList: 'initial state' }, {
                type: SETCLIST,
                payload: 'test2',
            }),
        ).toEqual(['test2']);
    });
});