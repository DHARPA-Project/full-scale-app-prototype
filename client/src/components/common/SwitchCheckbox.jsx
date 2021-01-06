import React from 'react'
import PropTypes from 'prop-types'

import './SwitchCheckbox.scss'

const SwitchCheckbox = ({enabled, classes, onToggle}) => {
    return (
        <label className={`switch ${classes}`}>
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

SwitchCheckbox.propTypes = {
    enabled: PropTypes.bool,
    classes: PropTypes.string,
    onToggle: PropTypes.func.isRequired
}

SwitchCheckbox.defaultProps = {}

export default SwitchCheckbox
