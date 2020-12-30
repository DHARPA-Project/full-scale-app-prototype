import React from 'react'

import './SwitchCheckbox.scss'

const SwitchCheckbox = () => {
    return (
        <label className="switch">
            <input type="checkbox" className="switch-checkbox" />
            <span className="switch-slider"></span>
        </label>
    )
}

export default SwitchCheckbox
