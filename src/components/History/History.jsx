import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddItemForm from '../Price/Form/AddItemForm';
import Coin from '../Price/Coin/Coin';
import './History.css';
import LineChart from '../Chart/LineChart';
import Chart from '../D3/Chart';
import RadioButtons from './RadioButtons/RadioButtons';
import * as moment from 'moment';


class HistoryComponent extends Component {
    constructor() {
        super();
        this.isActBtnCoin = false;
        this.isActBtnCur = false;
        this.state = {
            currentData: 'day',
            dataDay: [],
            dataHour: [],
            dataMinute: [],
            toggleBtn: '',
            currentCurrency: '',
            currentCoin: '',
            currencyList: [],
            list: [],
            dataD3: []
        };
    }

    fetchData() {
        const {currentCoin, currentCurrency} = this.state;
        fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${currentCoin}&tsym=${currentCurrency}&limit=10`)
            .then(res => res.json())
            .then(posts => {
                if (posts) {
                    const arrOfPosts = posts.Data;
                    this.setState({
                        dataDay: {...this.state.dataDay, [currentCoin +'-'+ currentCurrency]: arrOfPosts}
                    });
                }
            });
        fetch(`https://min-api.cryptocompare.com/data/histohour?fsym=${currentCoin}&tsym=${currentCurrency}&limit=10`)
            .then(res => res.json())
            .then(posts => {
                if (posts) {
                    const arrOfPosts = posts.Data;
                    this.setState({
                        dataHour: {...this.state.dataHour, [currentCoin +'-'+ currentCurrency]: arrOfPosts}
                    });
                }
            });
        fetch(`https://min-api.cryptocompare.com/data/histominute?fsym=${currentCoin}&tsym=${currentCurrency}&limit=10`)
            .then(res => res.json())
            .then(posts => {
                if (posts) {
                    const arrOfPosts = posts.Data;
                    this.setState({
                        dataMinute: {...this.state.dataMinute, [currentCoin +'-'+ currentCurrency]: arrOfPosts}
                    });
                }
            });
    }

    componentDidMount() {
        fetch(`https://min-api.cryptocompare.com/data/exchange/histoday?tsym=USD&limit=10`)
            .then(res => res.json())
            .then(posts => posts.Data)
            .then(posts => posts.map(el => ({title: moment(el.time).format('lll'), value: el.volume/10000})))
            .then(posts => this.setState({dataD3: [...posts]}))
    }

    handleToggleBtn = (itemName) => {
        this.setState({
            toggleBtn: this.state.toggleBtn !== itemName ? itemName : ''
        })
    };
    handleCurrentData = (currentData) => {
        this.setState({
            currentData
        });
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
    handleSubmit = event => {
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
        this.fetchData('day');

    };
    filterForDelete = (item, isCoin) => (!isCoin ? this.state.currencyList : this.state.list).filter(element => element.Name !== item);

    handleDelete = (item, isCoin) => {
        if (isCoin) {
            const {dataDay, dataHour, dataMinute} = this.state;
            const list = this.filterForDelete(item, isCoin);
            const newData = data => {
                const newData = {};
                for(let key in data){
                    if(!String(key).includes(String(item))){
                        newData[key] = data[key];
                    }
                }
                return newData;
            };
            this.setState({
                list,
                dataDay: {...newData(dataDay)},
                dataHour: {...newData(dataHour)},
                dataMinute: {...newData(dataMinute)}
            });
        }
    };

    render() {
        const {currentCoin, currentCurrency, list} = this.state;
        const data = this.state.currentData === 'day' ? this.state.dataDay : this.state.currentData === 'hour' ? this.state.dataHour : this.state.dataMinute;
        const {coins, currencyAll} = this.props;
        const arrOfData = Object.keys(data);

        const backgroundColor =  [
            'rgba(155,100,210,0.6)',
            'rgba(90,178,255,0.6)',
            'rgba(240,134,67,0.6)',
            'rgba(255,105,145,0.6)',
            'rgba(120,120,120,0.6)',
            'rgba(5, 245, 42,0.6)',
            'rgba(200, 217, 197,0.6)',
            'rgba(250, 245, 137,0.6)',
            'rgba(210,55,117,0.6)',
            'rgba(0, 191, 255,0.6)'
        ];
        const borderColor = 'transparent';
        const chartData = {
            labels: [], //to push dynamically
            datasets: []
        };
        arrOfData.map((item, i) => {
            let dataSet = [];
            if (data[item]) {
                data[item].map((el, j) => {
                    dataSet.push(el.high);
                    chartData.labels[j] = moment(data[item][j].time).format('MMM Do, h:mm');
                    return el;
                })
            }
            chartData.datasets[i] = {label: item, backgroundColor: backgroundColor.splice(-1).concat(backgroundColor), borderColor, data: dataSet};
            return item;
        });

        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 posts  text-center">
                            <h1>History</h1>
                        </div>
                        {arrOfData.length ? <RadioButtons handleCurrentData={this.handleCurrentData}/> : null}
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


                    {arrOfData.length ?<LineChart dataSet={chartData} />: null}

                    <div className="App-chart-container">
                        <h2>Historical Daily Exchange Volume</h2>
                        <Chart data={this.state.dataD3}/>
                    </div>
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

const History = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HistoryComponent);

export default History;
