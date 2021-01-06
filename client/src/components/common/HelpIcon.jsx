import React from 'react'
import PropTypes from 'prop-types'

import {Icon} from 'semantic-ui-react'

import './HelpIcon.css'

const HelpIcon = ({size}) => {
    return (
        <span className="help-icon-container">
            <Icon circular color="grey" link name="help" size={size} className="help-icon" />
        </span>
    )
}

HelpIcon.propTypes = {
    size: PropTypes.string.isRequired,
}

HelpIcon.defaultProps = {
    size: 'small',
}

export default HelpIcon
