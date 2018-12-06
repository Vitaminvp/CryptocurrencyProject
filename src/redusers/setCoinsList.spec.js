import setList from './setCoinsList';
import { SETLIST } from '../constants';

describe('Search reducers', () => {
    test('should return the initial state', () => {
        expect(setList(undefined, {})).toEqual([]);
    });
    test('should handle CURRENT', () => {
        expect(
            setList('', {
                type: SETLIST,
                payload: 'test',
            }),
        ).toEqual(['test']);
        expect(
            setList({ setList: 'initial state' }, {
                type: SETLIST,
                payload: 'test2',
            }),
        ).toEqual(['test2']);
    });
});