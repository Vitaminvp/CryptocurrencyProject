import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddItemForm from '../Price/Form/AddItemForm';
import Coin from '../Price/Coin/Coin';
import './Exchange.css';
import BarChart from '../Chart/BarChart';
import PieChart from '../Chart/PieChart';
import DoughnutChart from '../Chart/DoughnutChart';


class ExchangeComponent extends Component {
    constructor() {
        super();
        this.isActBtnCoin = false;
        this.isActBtnCur = false;
        this.state = {
            data: [],
            toggleBtn: '',
            currentCurrency: '',
            currentCoin: '',
            currencyList: [],
            list: []

        };
    }

    fetchData() {
        const {currentCoin, currentCurrency} = this.state;
        fetch(`https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=${currentCoin}&tsym=${currentCurrency}`)
            .then(res => res.json())
            .then(posts => {
                if (posts) {
                    const arrOfPosts = posts.Data.Exchanges;
                    this.setState({
                        data: [...this.state.data, {[currentCoin +'-'+ currentCurrency]: arrOfPosts}]
                    });
                }
            });
    }

    componentDidMount() {
    }

    handleToggleBtn = (itemName) => {
        this.setState({
            toggleBtn: this.state.toggleBtn !== itemName ? itemName : ''
        })
    };
    handleChange = (value, isCoin) => {
        if (isCoin) {
            this.setState((state, props) => {
                this.isActBtnCur = state.currentCurrency && value;
                return {currentCoin: value}
            });
            this.setState((state, props) => ({currentCoin: value}));
        } else {
            this.setState((state, props) => {
                this.isActBtnCur = state.currentCoin && value;
                return {currentCurrency: value}
            });
        }
        this.isActBtnCur = !!(this.state.currentCoin && this.state.currentCurrency) ? false : true;
    };
    handleSubmit = (event) => {
        const {currentCoin, currentCurrency} = this.state;
        if (currentCoin && currentCurrency) {
            this.setState({toggleBtn: ''});
            const coin = {
                Name: this.state.currentCoin
            };

            this.setState({currentCoin: ''});
            this.setState({list: [...this.state.list, coin]});

            const current = {Name: this.state.currentCurrency};
            if (current.Name) {
                this.setState({currentCurrency: ''});
                this.setState({currencyList: [...this.state.currencyList, current]});
            }
            this.isActBtnCur = false;
        }
        event.preventDefault();
        this.fetchData();
    };
    filterForDelete = (item, isCoin) => (!isCoin ? this.state.currencyList : this.state.list).filter(element => element.Name !== item);

    handleDelete = (item, isCoin) => {
        if (isCoin) {
            const list = this.filterForDelete(item, isCoin);
            this.setState({
                list,
                data: this.state.data.filter(el => !Object.keys(el)[0].toUpperCase().includes(item.toUpperCase()))
            });
            
        }
    };

    render() {
        const {data, currentCoin, currentCurrency, list} = this.state;
        const {coins, currencyAll} = this.props;
        const arrOfData = data.map(item => Object.keys(item)[0]);
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 posts  text-center">
                            <h1>Exchange</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 text-right hidden-button">
                            <AddItemForm onSubmit={this.handleSubmit}
                                         value={currentCoin}
                                         onChange={this.handleChange}
                                         coins={coins}
                                         list={list}
                                         isCoin={true}
                                         disabled={!this.isActBtnCoin}>Pick your coins.</AddItemForm>
                        </div>
                        <div className="col-md-6">
                            <AddItemForm onSubmit={this.handleSubmit}
                                         value={currentCurrency}
                                         onChange={this.handleChange}
                                         coins={currencyAll}
                                         list={[]}
                                         isCoin={false}
                                         disabled={!this.isActBtnCur}>Pick your coins.</AddItemForm>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Coin handleDelete={this.handleDelete}
                                  list={list}
                                  items={coins}
                                  classN="coins"
                                  coinCarrency={arrOfData}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2 text-center text-dark font-weight-bold">Market</div>
                        <div className="col-md-2 text-center text-dark font-weight-bold ">
                            From
                        </div>
                        <div className="col-md-2 text-center text-dark font-weight-bold">To
                        </div>
                        <div className="col-md-2 text-center text-dark font-weight-bold">
                            Price
                        </div>
                        <div className="col-md-2 text-center text-dark font-weight-bold">
                            Volume 24 hour
                        </div>
                        <div className="col-md-2 text-center text-dark font-weight-bold">Volume 24 hour
                            To
                        </div>
                    </div>
                    {arrOfData.map((item, i) => {
                        const labelsSet  = [];
                        const dataSet = [];
                        if (data[i][item]) {
                            return <div className="row-bottom" key={item}>{data[i][item].map(el => {
                                labelsSet.push(el.MARKET);
                                dataSet.push(el.LASTVOLUMETO);
                                return (<div className="row border-bottom" key={el.LASTTRADEID}>
                                            <div className="col-md-2 text-center border-right">{el.MARKET || 'no data'}</div>
                                            <div className="col-md-2 text-center border-right">{el.FROMSYMBOL || 'no data'}</div>
                                            <div className="col-md-2 text-center border-right">{el.TOSYMBOL || 'no data'}</div>
                                            <div className="col-md-2 text-center border-right">{el.PRICE || 'no data'}</div>
                                            <div className="col-md-2 text-center border-right">{el.VOLUME24HOUR || 'no data'}</div>
                                            <div className="col-md-2 text-center">{el.LASTVOLUMETO || 'no data'}</div>
                                        </div>)

                            })}
                                    {i%3 ? <BarChart dataSet={dataSet} labelsSet={labelsSet}/> :
                                     i%2 ? <PieChart dataSet={dataSet} labelsSet={labelsSet}/> : <DoughnutChart dataSet={dataSet} labelsSet={labelsSet}/>}
                            </div>

                        }else{
                            return <div className="row border-bottom row-bottom" key={item}>
                                    <div className="col-md-12 text-center text-tomato font-weight-bold text-uppercase">{item} no data</div>
                            </div>
                        }
                    })}
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    coins: state.coins.coins,
    currencyAll: state.currencyAll,
    currentCurrency: state.currentCurrency,
    currentCoin: state.currentCoin,
    currencyList: state.currencyList
});

const mapDispatchToProps = {};

const Exchange = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ExchangeComponent);

export default Exchange;
