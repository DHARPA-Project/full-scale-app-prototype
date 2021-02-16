import React from 'react'
import {createPortal} from 'react-dom'
import PropTypes from 'prop-types'

import './ModuleDetailsModal.scss'

const ModuleDetailsModal = ({showCross, message, children, isVisible, setIsVisible}) => {
    return createPortal(
        isVisible && (
            <div className="modal-backdrop module-modal">
                <div className="modal-container">
                    <span
                        className="modal-close"
                        style={{display: showCross ? 'block' : 'none'}}
                        onClick={() => setIsVisible(false)}
                    >
                        &times;
                    </span>
                    <div className="modal-content">
                        {message && <h2 className="modal-title">{message}</h2>}
                        {children}
                    </div>
                </div>
            </div>
        ),
        document.getElementById('modal')
    )
}

ModuleDetailsModal.propTypes = {
    showCross: PropTypes.bool,
    message: PropTypes.string,
    className: PropTypes.string,
    isVisible: PropTypes.bool,
    setIsVisible: PropTypes.func.isRequired
}

ModuleDetailsModal.defaultProps = {
    showCross: true,
    message: '',
    className: 'modal',
    isVisible: false,
    setIsVisible: () => console.error('setIsVisible() function argument missing!')
}

export default ModuleDetailsModal
