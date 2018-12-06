import React from 'react';
import Btn from "./Btn/Btn";
import SelectOpt from "./selectOption/select";

const AddItemForm = ({value, onChange, onSubmit, coins, list, disabled, children, isCoin}) =>
    <form onSubmit={(e) => onSubmit(e, isCoin)}>
        <label>
            <i>{children}:&nbsp;</i>
            <select value={value} onChange={(e) => onChange(e.target.value, isCoin)} className="coinSelect">
                <option value="">&nbsp;</option>
                {coins.filter(coin => list.every(lst => lst.Name !== coin.Name)).map(item => <SelectOpt
                    Name={item.Name}
                    key={item.Id}/>)}
            </select>
        </label>
        <Btn disabled={disabled} classN="submitBtn">Add</Btn>
    </form>;

export default AddItemForm;

