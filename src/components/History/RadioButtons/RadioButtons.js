import React from "react";
import './RadioButtons.css';

const RadioButtons = (props) => {

    const handleChange = e => {
        props.handleCurrentData(e.target.value);
    };

    return <div className="radio-buttons text-center" onChange={handleChange}>
                <input type="radio" id="radio1" value='day' name="radios" defaultChecked={ true }/>
                    <label htmlFor="radio1">Days</label>
                <input type="radio" id="radio2" value='hour' name="radios"  />
                    <label htmlFor="radio2">Hours</label>
                <input type="radio" id="radio3" value='minute' name="radios" />
                    <label htmlFor="radio3">Minutes</label>
           </div>;
};

export default RadioButtons;
