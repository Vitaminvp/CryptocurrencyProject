import React from 'react';
import './currency.css';
import WrappedComponent from '../HOC/listTransformation';

const Currency = ({item, handleDelete}) => {

    const handleClick = (e) => {
        e.preventDefault();
        handleDelete(item.Name);
    };
    return <div className="coin">
        <h3>{item.Name}</h3>
        <a href="/" onClick={handleClick}>&times;</a>
    </div>;
};

export default WrappedComponent(Currency);

