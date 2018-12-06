import React from 'react';
import Modal from '../../Modal';
import {CRYPTO_COMPARE_URL} from '../../../constants';
import './coin.css';
import WrappedComponent from '../HOC/listTransformation';

class Coin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false};
    }
    toggleModal = () => {
        this.setState({showModal: !this.state.showModal});
    };
    handleClick = (e) => {
        e.preventDefault();
        this.props.handleDelete(this.props.item.Name, true);
    };

    render() {
        const {item, coinCarrency} = this.props;
        const currencyTitle = ( coinCarrency !== undefined && coinCarrency.length ) ? coinCarrency.filter(el => el.includes(item.Name)) : null;
        const modal = this.state.showModal ? (
            <Modal>
                <div className="modal">
                    <div>
                        <img src={`${CRYPTO_COMPARE_URL}${item.ImageUrl}`} alt={item.CoinName} onClick={this.toggleModal}/>
                        <h2>{item.CoinName}</h2>
                        <button onClick={this.toggleModal}>&times;</button>
                    </div>
                </div>
            </Modal>
        ) : null;
        return <>
                <div className="coin">
                    <img src={`${CRYPTO_COMPARE_URL}${item.ImageUrl}`} alt={item.CoinName} onClick={this.toggleModal}/>
                    <span>{ currencyTitle !== null && currencyTitle[0] !== undefined ? currencyTitle[0].slice(-3):null }</span>
                    <a href="/" onClick={this.handleClick}>&times;</a>
                </div>
                {modal}
        </>;
    }
}

export default WrappedComponent(Coin);

