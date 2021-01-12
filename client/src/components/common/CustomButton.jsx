import React from 'react'
import PropTypes from 'prop-types'

import './CustomButton.scss'

const CustomButton = ({children, inverted, classes, ...otherProps}) => {
    return (
        <button
            className={`custom-button${inverted ? ' inverted' : ''}${classes ? ` ${classes}` : ''}`}
            {...otherProps}
        >
            {children}
        </button>
    )
}

CustomButton.propTypes = {
    inverted: PropTypes.bool,
    classes: PropTypes.string
}

CustomButton.defaultProps = {}

export default CustomButton
