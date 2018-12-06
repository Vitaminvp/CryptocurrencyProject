import React from 'react';
import './Btn.css';

const Btn = ({classN, children, disabled}) => <input type="submit" value={children} disabled={disabled} className={classN}/>;


export default Btn;

