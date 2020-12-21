import React from 'react'
import PropTypes from 'prop-types'
import './Modal.scss'

const Modal = ({visible, showCross, message, children}) => {
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <span className="modal-close" style={{display: showCross ? 'block' : 'none'}}>
                    &times;
                </span>
                {message && <h2 className="modal-title">{message}</h2>}
                {children}
            </div>
        </div>
    )
}

Modal.propTypes = {
    // visible: PropTypes.bool.isRequired,
    showCross: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object
}

Modal.defaultProps = {
    // visible: false,
    showCross: true,
    message: 'Are you sure?',
    className: 'Modal'
}

export default Modal
