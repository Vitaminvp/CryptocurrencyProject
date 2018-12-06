import { INCREMENT, CURRENCY, CURRENT, VALUE, SETLIST, ADDTOLIST, ADDTOCLIST, SETCLIST } from '../constants';

import { increment, currency, current, value, setList, addToList, setCurList } from './index';

describe('Search actions', () => {

    test('should create an action for user input in search field', () => {
        const userInput = 'test';
        const expectedAction = {
            type: INCREMENT,
            payload: userInput,
        };
        expect(increment(userInput)).toEqual(expectedAction);
    });
    test('should create an action for user input in search field', () => {
        const userInput = 'test';
        const expectedAction = {
            type: CURRENCY,
            payload: userInput,
        };
        expect(currency(userInput)).toEqual(expectedAction);
    });
    test('should create an action for user input in search field', () => {
        const userInput = 'test';
        const expectedAction = {
            type: CURRENT,
            payload: userInput,
        };
        expect(current(userInput)).toEqual(expectedAction);
    });
    test('should create an action for user input in search field', () => {
        const userInput = 'test';
        const expectedAction = {
            type: VALUE,
            payload: userInput,
        };
        expect(value(userInput)).toEqual(expectedAction);
    });
    test('should create an action for user input in search field', () => {
        const userInput = 'test';
        const expectedAction = {
            type: SETLIST,
            payload: userInput,
        };
        expect(setList(userInput)).toEqual(expectedAction);
    });
    test('should create an action for user input in search field', () => {
        const userInput = 'test';
        const expectedAction = {
            type: ADDTOLIST,
            payload: userInput,
        };
        expect(addToList(userInput)).toEqual(expectedAction);
    });
    test('should create an action for user input in search field', () => {
        const userInput = 'test';
        const expectedAction = {
            type: SETCLIST,
            payload: userInput,
        };
        expect(setCurList(userInput)).toEqual(expectedAction);
    });

});