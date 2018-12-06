import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import History from './components/History/History.jsx';
import NewsComponent from './components/News';
import Coins from './components/Coins/Coins.jsx';
import Exchange from './components/Exchange/Exchange.jsx';
import Price from './components/Price/Price.jsx';
import ForOFor from './components/404.jsx'
import './App.css';
import TopMenu from './components/TopMenu/TopMenu';
import { connect } from 'react-redux';
import { getCoinsList } from './AC';


class AppComponent extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        const coinsList = localStorage.getItem('coinsList')?JSON.parse(localStorage.getItem('coinsList')):[];
        const strCoinsList = coinsList.map(item => `${item.Name}:${item.value}`).join('&');
        const currencyList = localStorage.getItem('currencyList')?JSON.parse(localStorage.getItem('currencyList')):[];
        const strCurrencyList = currencyList.map(item => `${item.Name}`).join('&');
        const url = (coinsList !== '' && currencyList !== '') ? `/coins/${strCoinsList}$${strCurrencyList}` : '/coins/42:1?USD';
        this.state = {
            url
        }
    }
    handleSetState = (url) => {
        if(url !== this.state.url)
            this.setState({url});
    };
    componentDidMount() {
        this._isMounted = true;
        this.props.getCoinsList();
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    render() {
        return (
            <BrowserRouter>
                <Route
                    render={({location}) => (
                        <>
                        <TopMenu url={this.state.url} />
                        <TransitionGroup>
                            <CSSTransition key={location.key} classNames="fade" timeout={500}>
                                <Switch location={location}>
                                    <Route exact path="/" component={Coins}/>
                                    <Route path="/history" component={History}/>
                                    <Route path="/exchange" component={Exchange}/>
                                    <Route path="/news" component={NewsComponent}/>
                                    <Route path="/coins/:list" component={(props) => <Price {...props} coins={this.props.coins} handleSetState={this.handleSetState}/>} exact />
                                    <Route component={ForOFor}/>
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                        </>
                    )}
                />
            </BrowserRouter>
        );
    }
}
const mapStateToProps = state => ({
    coins: state.coins.coins,
});

const mapDispatchToProps = {
    getCoinsList,
};

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppComponent);

export default App;
