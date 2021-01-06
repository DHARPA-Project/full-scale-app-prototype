import React, {useContext} from 'react'
import PropTypes from 'prop-types'

import './NotificationContainer.scss'

import {Context} from '../../context/index'

import NotificationItem from './NotificationItem'

const NotificationContainer = ({position}) => {
    const {notifications} = useContext(Context)

    return (
        <ul className={`notification-list ${position}`}>
            {notifications.map(notification => (
                <NotificationItem {...notification} key={notification.id} />
            ))}
        </ul>
    )
}

NotificationContainer.propTypes = {
    position: PropTypes.string
}

NotificationContainer.defaultProps = {
    position: 'bottom-right'
}

export default NotificationContainer
