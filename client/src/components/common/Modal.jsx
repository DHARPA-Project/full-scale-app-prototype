import React from 'react'
import {createPortal} from 'react-dom'
import PropTypes from 'prop-types'
import {AnimatePresence, motion} from 'framer-motion'

import './Modal.scss'

const Modal = ({showCross, message, children, isVisible, setIsVisible}) => {
    return createPortal(
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="modal-backdrop"
                    onClick={() => setIsVisible(false)}
                    initial={{opacity: 0}}
                    animate={{opacity: 1, transition: {duration: 0.3}}}
                    exit={{opacity: 0, transition: {delay: 0.3}}}
                >
                    <motion.div
                        className="modal-container"
                        initial={{scale: 0}}
                        animate={{scale: 1, transition: {duration: 0.3}}}
                        exit={{scale: 0, transition: {delay: 0.3}}}
                    >
                        <span
                            className="modal-close"
                            style={{display: showCross ? 'block' : 'none'}}
                        >
                            &times;
                        </span>
                        <motion.div
                            className="modal-content"
                            initial={{x: 100, opacity: 0}}
                            animate={{x: 0, opacity: 1, transition: {delay: 0.3, duration: 0.3}}}
                            exit={{x: 100, opacity: 0, transition: {duration: 0.3}}}
                        >
                            {message && <h2 className="modal-title">{message}</h2>}
                            {children}
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.getElementById('dharpa-modal')
    )
}

Modal.propTypes = {
    showCross: PropTypes.bool,
    message: PropTypes.string,
    className: PropTypes.string,
    isVisible: PropTypes.bool,
    setIsVisible: PropTypes.func.isRequired
}

Modal.defaultProps = {
    showCross: true,
    message: '',
    className: 'modal',
    isVisible: false,
    setIsVisible: () => console.error('setIsVisible() function argument missing!')
}

export default Modal
