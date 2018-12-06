import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {CRYPTO_COMPARE_URL} from '../../../constants';

class Card extends Component {
    render() {
        const {card} = this.props || {};
        return (
            <Fragment>
                <div className="flip-container col-sm-6 col-md-3 country-card">
                    <div
                        className="flipper country-card-container  rounded  mx-2 my-3 d-flex flex-row align-items-center p-0 ">
                        <div className="front w-100 border-gray border-right p-2 bg-white rounded-left">
                            <span className="country-name text-dark d-block font-weight-bold">
                                  <h2><a href={`/coins/${card.Name}:1$USD&EUR&UAH&RUB`}
                                         rel="noopener noreferrer">{card.CoinName}</a></h2>
                            </span>
                            <img
                                src={`${CRYPTO_COMPARE_URL}${card.ImageUrl}`}
                                className="d-block w-100 h-auto"
                                alt={card.CoinName}/>
                        </div>
                        <div
                            className="back w-100 position-relative border-gray border-right p-2 bg-white rounded-left">
                            <a href={`/coins/${card.Name}:1$USD&EUR&UAH&RUB`}
                               rel="noopener noreferrer">
                                <span className="country-name text-dark d-block font-weight-bold">
                                <h2>{card.CoinName}</h2>
                                <p>Algorithm: {card.Algorithm}</p>
                                <p>Full name: {card.FullName}</p>
                                <p>PreMined value: {card.PreMinedValue}</p>
                                <p>Smart contract address: {card.SmartContractAddress}</p>
                                <p>Sort order: {card.SortOrder}</p>
                                <p>Total coin supply: {card.TotalCoinSupply}</p>
                                <p>Total Ccoins free float: {card.TotalCoinsFreeFloat}</p>
                            </span>
                            </a>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

Card.propTypes = {
    card: PropTypes.shape({
        CoinName: PropTypes.string.isRequired,
        Name: PropTypes.string.isRequired,
        Id: PropTypes.string.isRequired

    }).isRequired
};
export default Card;
