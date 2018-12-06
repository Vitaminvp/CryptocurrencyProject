import React, {Component} from 'react';
import WrappedComponent from '../HOC/listTransformation';
import './coinAmount.css';

class CoinAmount extends Component{ //item, value, Spn, handleCoinsChangeAmount
    constructor(props){
        super(props);
        this.state = {
            isValid: true
        };
    }
    handleChange = (e) => {
        const { item, handleCoinsChangeAmount } = this.props;
        const re = /^[0-9.\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            handleCoinsChangeAmount(item.Name, e.target.value);
            this.setState({
                isValid: true
            });
        } else {
            handleCoinsChangeAmount(item.Name, '0');
            this.setState({
                isValid: false
            });
        }
        e.preventDefault();
    };
    render() {
        const {item, value, Spn} = this.props;
        return <div className="coinAmount">
            <label className="coinAmount_label"><span className="coinName">{item.Name}:</span>
                <input
                    onChange={this.handleChange}
                    defaultValue={value}
                    className="coinAmount_input"/>
                {!this.state.isValid ? Spn : null}
            </label>
        </div>;
    }

};

export default WrappedComponent(CoinAmount);

