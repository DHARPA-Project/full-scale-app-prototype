import React from 'react'
import PropTypes from 'prop-types'
import './Modal.scss'

const Modal = ({showCross, message, children, closeModal}) => {
    return (
        <div className="modal-backdrop" onClick={() => closeModal()}>
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
    showCross: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    closeModal: PropTypes.func.isRequired
}

Modal.defaultProps = {
    showCross: true,
    message: 'Are you sure?',
    className: 'Modal',
    closeModal: () => console.error('closeModal() function argument missing!')
}

export default Modal
