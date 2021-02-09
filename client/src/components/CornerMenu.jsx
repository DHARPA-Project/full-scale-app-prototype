import React from 'react'

import {FaRegBell} from 'react-icons/fa'

import './CornerMenu.scss'

import ProfileBubble from './ProfileBubble'
import UserStatus from './UserStatus'

const CornerMenu = () => {
    return (
        <div className="corner-menu">
            <FaRegBell size={20} />
            <UserStatus />
            <ProfileBubble />
        </div>
    )
}

export default CornerMenu
