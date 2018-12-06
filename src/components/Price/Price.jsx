import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Coin from "./Coin/Coin";
import CoinAmount from "./CoinAmount/CoinAmount";
import CurrencyAmount from "./CurrencyAmount/CurrencyAmount";
import Currency from "./Currency/Currency";
import Span from "./CoinAmount/ErrorSpan";
import AddItemForm from "./Form/AddItemForm";
import ErrorBoundary from "../ErrorBoundary";
import {setCurrencyNameAll, setCurrentCurrency, setCurrentCoin, addToCoinsList, setCoinsList, setCurrencyList, addToCurrencyList} from "../../AC";
import './price.css';

class PriceComponent extends Component {
    constructor(props) {
        super(props);
        this.isActBtnCoin = true;
        this.isActBtnCur = true;

        // ------------ localStorage ------------- //
        // const list = localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')):[];
        // const currencyList = localStorage.getItem('currencyList')?JSON.parse(localStorage.getItem('currencyList')):[];
        // ------------ localStorage ------------- //

        const split = this.props.match.params.list.split('$');
        const coinsList = split[0] ? split[0].split('&').map(item => ({
                                                            Name: item.split(':')[0],
                                                            value: parseInt(item.split(':')[1])
                                                        })) : [];
        const currencyList = split[1] ? split[1].split('&').map(item => ({Name: item})) : [];
        this.props.setCoinsList(coinsList);
        this.props.setCurrencyList(currencyList);
        this.state={ toggleBtn: '' };
    }
    static propTypes = {
        setCurrencyNameAll: PropTypes.func.isRequired,
        currencyAll: PropTypes.array.isRequired,
        coinsList: PropTypes.array.isRequired,
        currencyList: PropTypes.array.isRequired,
        setCurrentCoin: PropTypes.func.isRequired,
        currentCoin: PropTypes.string.isRequired
    };
    static defaultProps = {

        test: <span style={{fontSize: 'smaller'}}>select your coin.</span>
    };
    // ------------ localStorage ------------- //
    setLocalState = () => {
        const localList = [...this.props.coinsList];
        const localCurList = [...this.props.currencyList];
        localStorage.setItem('coinsList', JSON.stringify(localList));
        localStorage.setItem('currencyList', JSON.stringify(localCurList));
    };
    getLocalState = () => {
        const coinsList = this.props.coinsList.map(item => `${item.Name}:${item.value}`).join('&');
        const currencyList = this.props.currencyList.map(item => `${item.Name}`).join('&');
        let allList;
        if(coinsList || currencyList){
            allList = `/coins/${coinsList}$${currencyList}`
        }else{
            allList='';
        }
        return allList;
    };

    getSnapshotBeforeUpdate(prevProps, prevState) {
        // ------------ localStorage ------------- //
        this.setLocalState();
        // ------------ localStorage ------------- //

        if (this.props.location.pathname !== this.getLocalState()) {
            const url = this.getLocalState();
            window.history.pushState({id: 'localhost'}, 'Cripto', url);
        }
        return null;
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        const url = this.getLocalState();
        this.props.handleSetState(url);
    }
    handleToggleBtn = (itemName) => {
        this.setState({
            toggleBtn: this.state.toggleBtn !== itemName ? itemName : ''
        })
    };
    handleChange = (value, isCoin) => {
        if (isCoin) {
            this.isActBtnCoin = !value;
            this.props.setCurrentCoin(value);
        } else {
            this.isActBtnCur = !value;
            this.props.setCurrentCurrency(value);
        }
    };
    handleSubmit = (event, isCoin) => {
        if (isCoin) {
            this.setState({toggleBtn: ''});
            const coin = {
                Name: this.props.currentCoin,
                value: 0
            };
            if (this.props.currentCoin) {
                this.props.setCurrentCoin('');
                this.props.addToCoinsList(coin);
            }
            this.isActBtnCoin = true;
        } else {
            const current = {Name: this.props.currentCurrency};
            if (current.Name) {
                this.props.setCurrentCurrency('');
                this.props.addToCurrencyList(current);
            }
            this.isActBtnCur = true;
        }
        event.preventDefault();
    };

    filterForDelete = (item, isCoin) => (!isCoin ? this.props.currencyList : this.props.coinsList).filter(element => element.Name !== item);

    handleDelete = (item, isCoin) => {
        if (isCoin) {
            const coinsList = this.filterForDelete(item, isCoin);
            this.props.setCoinsList(coinsList);
        } else {
            const currencyList = this.filterForDelete(item);
            this.props.setCurrencyList(currencyList);
        }
    };

    handleCoinsChangeAmount = (name, value) => {
        let coinsList = [...this.props.coinsList];
        coinsList = coinsList.map(item => {
            if (item.Name === name) item.value = value;
            return item;
        });
        this.props.setCoinsList(coinsList);
    };

    render() {
        const {coins, currencyAll, currentCoin, currentCurrency, coinsList, currencyList} = this.props;
        return (
            <div className="coinsWrapper">
                <div className="coinContainer">

                    <h2>Coins: {this.props.test}</h2>

                    <ErrorBoundary>

                        <AddItemForm onSubmit={this.handleSubmit}
                              value={currentCoin}
                              onChange={this.handleChange}
                              coins={coins}
                              list={coinsList}
                              isCoin={true}
                              disabled={this.isActBtnCoin}>Pick your coins.</AddItemForm>

                        <Coin handleDelete={this.handleDelete}
                              list={coinsList}
                              items={coins}
                              classN="coins" />

                        <CoinAmount list={coinsList}
                                    items={coins}
                                    classN="coinsAmounts"
                                    handleCoinsChangeAmount={this.handleCoinsChangeAmount}
                                    amount={true}
                                    Spn={<Span>Only numbers allowed!</Span>}/>

                    </ErrorBoundary>

                </div>
                <div className="coinContainer">
                    <h2>Currency: <span style={{fontSize: 'smaller'}}>select your currency.</span></h2>
                    <ErrorBoundary>
                        <AddItemForm onSubmit={this.handleSubmit}
                              value={currentCurrency}
                              onChange={this.handleChange}
                              coins={currencyAll}
                              list={currencyList}
                              disabled={this.isActBtnCur}>Pick your currency.</AddItemForm>


                        <Currency handleDelete={this.handleDelete}
                             classN="coins"
                             list={currencyList}
                             items={currencyAll}/>

                        <CurrencyAmount
                                   list={coinsList}
                                   items={coins}
                                   classN="coinsAmounts"
                                   currencyList={currencyList}
                                   currencyAll={currencyAll}
                                   handleToggleBtn = {this.handleToggleBtn}
                                   toggleBtn = {this.state.toggleBtn}
                                   amount={true}/>
                    </ErrorBoundary>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currencyAll: state.currencyAll,
    currentCurrency: state.currentCurrency,
    currentCoin: state.currentCoin,
    coinsList: state.coinsList,
    currencyList: state.currencyList
});

const mapDispatchToProps = {
    setCurrencyNameAll,
    setCurrentCurrency,
    setCurrentCoin,
    setCoinsList,
    addToCoinsList,
    setCurrencyList,
    addToCurrencyList
};

const Price = connect(
    mapStateToProps,
    mapDispatchToProps
)(PriceComponent);

export default Price;

