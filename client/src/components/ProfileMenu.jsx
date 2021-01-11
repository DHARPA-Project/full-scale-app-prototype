import React from 'react'
import {Link} from 'react-router-dom'

import './ProfileMenu.scss'

const ProfileMenu = () => {
    return (
        <nav className="profile-menu-nav">
            <ul className="profile-menu-list">
                <li className="profile-menu-item">
                    <Link to="/profile">Profile</Link>
                </li>
                <li className="profile-menu-item">
                    <Link to="/settings">Settings</Link>
                </li>
                <li className="profile-menu-item">
                    <Link to="/logout" className="profile-menu-logout">
                        Log Out
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default ProfileMenu
