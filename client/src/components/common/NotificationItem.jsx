import React, {useContext, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'

import {
    FaCheck,
    FaExclamationCircle,
    FaExclamationTriangle,
    FaInfoCircle,
    FaRegWindowClose
} from 'react-icons/fa'

import {Context} from '../../context'

import './NotificationItem.scss'

const notificationIcon = {
    success: <FaCheck />,
    info: <FaInfoCircle />,
    warning: <FaExclamationTriangle />,
    error: <FaExclamationCircle />
}

// the length in characters beyond which a message...
// ... will be considered large (for layout & style purposes)
const messageThreshold = 38

const NotificationItem = ({id, lifeSpan, message, type}) => {
    const {destroyNotification} = useContext(Context)

    const timeoutRef = useRef(null)

    useEffect(() => {
        if (lifeSpan) {
            timeoutRef.current = setTimeout(() => destroyNotification(id), lifeSpan)

            return () => clearTimeout(timeoutRef.current)
        }
    }, [id, lifeSpan, destroyNotification])

    return (
        <li className={`notification ${type}`}>
            <FaRegWindowClose
                className={`close-button${message.length > messageThreshold ? ' large' : ''}`}
                onClick={() => destroyNotification(id)}
            />
            <div
                className={`notification-icon${message.length > messageThreshold ? ' large' : ''}`}
            >
                {notificationIcon[type]}
            </div>
            <div className="notification-content">
                <p className="notification-message">{message}</p>
            </div>
        </li>
    )
}

NotificationItem.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    message: PropTypes.string.isRequired,
    lifeSpan: PropTypes.number
}

NotificationItem.defaultProps = {
    lifeSpan: 5000,
    type: 'warning'
}

export default NotificationItem
