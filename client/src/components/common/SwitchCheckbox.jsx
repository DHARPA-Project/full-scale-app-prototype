import React from 'react'
import PropTypes from 'prop-types'

import './SwitchCheckbox.scss'

const SwitchCheckbox = ({enabled, classes, onToggle, label, value}) => {
    return (
        <label className={`switch-label ${classes}`}>
            <div className={`switch-container`}>
                <input
                    type="checkbox"
                    className="switch-checkbox"
                    checked={enabled}
                    value={value}
                    onChange={onToggle}
                />
                <span className="switch-slider"></span>
            </div>
            <span className="switch-label">{label}</span>
        </label>
    )
}

SwitchCheckbox.propTypes = {
    enabled: PropTypes.bool,
    classes: PropTypes.string,
    value: PropTypes.string,
    onToggle: PropTypes.func.isRequired
}

SwitchCheckbox.defaultProps = {}

export default SwitchCheckbox
