import React from 'react'
import PropTypes from 'prop-types'

import './CustomButton.scss'

const CustomButton = ({children, inverted, ...otherProps}) => {
    return (
        <button className={`${inverted && 'inverted '}custom-button`} {...otherProps}>
            {children}
        </button>
    )
}

CustomButton.propTypes = {
    inverted: PropTypes.bool
}

CustomButton.defaultProps = {
    className: 'custom-button'
}

export default CustomButton
