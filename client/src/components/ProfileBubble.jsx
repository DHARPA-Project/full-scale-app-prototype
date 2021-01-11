import React from 'react'

import './ProfileBubble.scss'

import UserIcon from './common/icons/UserIcon'
import ProfileMenu from './ProfileMenu'
import UserStatus from './UserStatus'

const ProfileBubble = () => {
    return (
        <div className="profile-bubble">
            <UserStatus />
            <UserIcon size={23} fill="white" />
            <ProfileMenu />
        </div>
    )
}

export default ProfileBubble
