import React from 'react'

import './SwitchCheckbox.scss'

const SwitchCheckbox = ({enabled, disabled, onToggle}) => {
    return (
        <label className={`switch ${disabled && 'disabled'}`}>
            <input
                type="checkbox"
                className="switch-checkbox"
                checked={enabled}
                disabled={disabled}
                onChange={onToggle}
            />
            <span className="switch-slider"></span>
        </label>
    )
}

export default SwitchCheckbox
