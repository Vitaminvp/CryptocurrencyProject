import React, {Component} from 'react';
import {connect} from 'react-redux';
import Card from './Pagination/Card';
import "bootstrap/dist/css/bootstrap.min.css";
import './Coins.css';
import Pagination from './Pagination';
import './Pagination/index.css';
import SearchInput  from '../Coins/SearchInput';
import Span  from '../Price/CoinAmount/ErrorSpan';

class CoinsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coins: [...this.props.coins],
            search: '',
            filteredCoins: [...this.props.coins],
            pageOfItems: [],
            pager: { pager: {} },
            isValid: true
        };
    }

    onChangePage = pageOfItems => {
        this.setState({pageOfItems: pageOfItems});
    };

    filterListBySearchTerm = (list, searchTerm) => (
        list.filter(coin => coin.CoinName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                coins: this.props.coins,
                filteredCoins: this.props.coins
            });
        }, 1500);
    };

    handleSearchChange = search => {
        const { coins } = this.state;
        const filteredCoins = this.filterListBySearchTerm(coins, search);
        if(filteredCoins.length <= 0){
            this.setState({
                isValid: false
            });
            return;
        }
        this.setState({
            isValid: true,
            search,
            filteredCoins
        });
    };

    handlePager = pager => {
        this.setState({ pager });
    };

    render() {
        const { search, filteredCoins } = this.state;
        return (
            <div className="container mb-5">
                {filteredCoins.length > 0 ? (
                    <>
                <div className="position-relative d-inline">{!this.state.isValid ? <Span>No results found for this query</Span> : null}
                    <SearchInput value={ search } onChange={ this.handleSearchChange } />
                </div>

                    <div className="row d-flex flex-row">
                        <div
                            className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between mycontainer">
                            <div className="d-flex flex-row align-items-center">
                                <h2 className=''>
                                    Coins: {filteredCoins.length > 0 ? filteredCoins.length : null}
                                </h2>
                            </div>
                            <div className="d-flex flex-row py-4 align-items-center">
                                <Pagination
                                    items={filteredCoins}
                                    onChangePage={this.onChangePage}
                                    handlePager={this.handlePager}
                                    pager={this.state.pager}/>
                            </div>
                        </div>
                        {this.state.pageOfItems.map(card => (
                            <Card key={card.Id} card={card}/>
                        ))}
                    </div>

                <div className="text-center">
                    <h2>
                        -{this.state.pager.currentPage? this.state.pager.currentPage : null}-
                    </h2>
                </div>
                    </>)
                : <div className="loader"><img src="./loader.gif" alt="CryptoCurrency"/></div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    coins: state.coins.coins,
    filteredCoinsList: state.filteredCoinsList
});

const mapDispatchToProps = {
};

const Coins = connect(
    mapStateToProps,
    mapDispatchToProps
)(CoinsComponent);

export default Coins;