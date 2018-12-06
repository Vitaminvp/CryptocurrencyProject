import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchInput extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    };
    state = {
        isValid: true,
    };

    handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        const { onChange } = this.props;
        onChange(searchTerm);

    };



    // handleSearchChange = event => {
    //
    //
    //     const is_array = obj => {
    //         if(obj.constructor.toString().indexOf('Array') === -1) {
    //             return false;
    //         }
    //         return true;
    //     };
    //
    //
    //     const strip_tags = input => {
    //         let newInput;
    //         if (input) {
    //             const tags = /<[^>]*>/g;
    //             if (!is_array(input)) {
    //                 newInput = input.replace(tags,'');
    //             }
    //             else {
    //                 newInput = input.map(item => item.replace(tags,''));
    //             }
    //             return newInput;
    //         }
    //         return false;
    //     };
    //
    //     const searchTerm = strip_tags(event.target.value)+'';
    //     const { onChange } = this.props;
    //
    //     if(searchTerm !== undefined) {
    //         onChange(searchTerm);
    //     }
    // };

    render() {
        const { value } = this.props;
        const { isValid } = this.state;
        return (
            <React.Fragment>
                {!isValid && <p>Search term should have at least 3 character</p>}
                <label htmlFor="search coinAmount_label" className="search">
                    <span className="coinName">Search</span>
                    <input
                        className="coinAmount_input"
                        type="text"
                        name="search"
                        id="search"
                        placeholder="search..."
                        value={value}
                        onChange={this.handleSearchChange}
                    />
                </label>
            </React.Fragment>
        );
    }
}

export default SearchInput;