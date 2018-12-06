import React, {Component} from 'react';

class SelectOpt extends Component {
    render() {
        const {Name} = this.props;
        return <option value={Name}>{Name}</option>;
    }
}

export default SelectOpt;
