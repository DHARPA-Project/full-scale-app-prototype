import React from 'react'
import PropTypes from 'prop-types'

import './CustomInput.scss'

const CustomInput = ({
    type,
    name,
    placeholder,
    required,
    value,
    handleChange,
    className,
    inputRef
}) => {
    return (
        <div className="custom-input-container">
            <input
                ref={inputRef}
                type={type}
                name={name}
                required={required}
                value={value}
                onChange={handleChange}
                className={`custom-input-input${value ? ' filled' : ''}${className ? ` ${className}` : ''}`} // prettier-ignore
            />
            <label htmlFor={name} className="custom-input-placeholder">
                {placeholder}
            </label>
        </div>
    )
}

CustomInput.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    required: PropTypes.bool
}

CustomInput.defaultProps = {
    type: 'text'
}

export default CustomInput
