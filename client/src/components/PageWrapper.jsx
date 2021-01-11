import React from 'react'

import './PageWrapper.scss'

import NavBar from './NavBar'
import ProfileBubble from './ProfileBubble'

const PageWrapper = ({children}) => {
    return (
        <div className="page-wrapper">
            <NavBar />
            <ProfileBubble />
            {children}
        </div>
    )
}

export default PageWrapper
