import React from 'react'

import './RadioButtons.scss'

const RadioButtons = ({options, selected, setSelected}) => {
    return (
        <div className="radio-buttons">
            {options.map(option => (
                <div key={option}>
                    <input
                        type="radio"
                        name="choice"
                        id={option}
                        checked={option === selected}
                        onChange={event => setSelected(option)}
                    />
                    <label htmlFor={option}>
                        <div className="dot"></div>
                        <span>{option}</span>
                    </label>
                </div>
            ))}
        </div>
    )
}

export default RadioButtons
