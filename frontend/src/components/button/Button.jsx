// import react from 'react';
import './button.css';

function Button({label, onClick}) {
    return(
        <div className='btn'>
            <button onClick={onClick}>{label}</button>
        </div>
    )
}

export default Button;