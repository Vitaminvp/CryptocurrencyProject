import React from 'react';
import { shallow } from 'enzyme';
import Coin from "./Coin/Coin";
import Coins from "./Price";
import CoinAmount from "./CoinAmount/CoinAmount";
import CurAmount from "./CurrencyAmount/CurrencyAmount";
import Cur from "./Currency/Currency";
import SelectOpt from "./Form/selectOption/select";
import coinsData from '../../data/coinsList.json';

let  coinsList = Object.keys(coinsData.Data).slice(0, 10).map(key => coinsData.Data[key]);

    xtest('Coins render correctly', () => {
        const component = shallow(<Coins coins={coinsList} search="" currency={() => {}} current={() => {}} value={() => {}} addToList={() => {}} setCurList={() => {}} addToCurList={() => {}} />);
        expect(component).toMatchSnapshot();
    });

    it('SelectOpt render correctly', () => {
        const component = shallow(<SelectOpt />);
        expect(component).toMatchSnapshot();
    });
    it('CoinAmount render correctly', () => {
        const component = shallow(<CoinAmount />);
        expect(component).toMatchSnapshot();
    });
    it('CurAmount render correctly', () => {
        const component = shallow(<CurAmount />);
        expect(component).toMatchSnapshot();
    });
    it('Cur render correctly', () => {
        const component = shallow(<Cur />);
        expect(component).toMatchSnapshot();
    });
    xit('Search should render correct amount of coins', () => {
        const component = shallow(<SelectOpt />);
        expect(component.find(SelectOpt).length).toEqual(coinsList.length);
    });

    xit('Search should render correct amount of coins based on seach term', () => {
        const component = shallow(<Coin />);
        const searchTerm = 'bitcoin';
        component.find('input').simulate('change', { target: { value: searchTerm } });
        const searchCount = component.instance().filterListBySearchTerm(coinsList, searchTerm).length;
        expect(component.find(Coin).length).toEqual(searchCount);
    });

