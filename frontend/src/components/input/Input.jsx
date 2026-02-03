import React from "react";
import './input.css';

function Input({value, onChange}) {
    return (
        <div className="input">
            <input type="text" placeholder="Enter your id here" value={value} onChange={onChange} />
        </div>
    )
}

export default Input;