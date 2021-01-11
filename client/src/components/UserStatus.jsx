import React, {useContext} from 'react'

import {Context} from '../context'
import './UserStatus.scss'

const UserStatus = () => {
    const {loggedInUser} = useContext(Context)

    return (
        <span className="user-status">
            {loggedInUser?.name
                ? loggedInUser.name
                : loggedInUser?.email
                ? loggedInUser.email
                : 'guest'}
        </span>
    )
}

export default UserStatus
