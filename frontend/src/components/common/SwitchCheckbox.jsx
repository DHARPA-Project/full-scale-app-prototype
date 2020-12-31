import React from 'react'

import './SwitchCheckbox.scss'

const SwitchCheckbox = ({enabled, onToggle}) => {
    return (
        <label className="switch">
            <input
                type="checkbox"
                className="switch-checkbox"
                checked={enabled}
                onChange={onToggle}
            />
            <span className="switch-slider"></span>
        </label>
    )
}

export default SwitchCheckbox
