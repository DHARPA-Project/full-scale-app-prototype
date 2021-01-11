import React from 'react'

import './PageWrapper.scss'

import NavBar from './NavBar'
import ProfileBubble from './ProfileBubble'
import Main from './Main'

const PageWrapper = ({children}) => {
    return (
        <div className="page-wrapper">
            <NavBar />
            <ProfileBubble />
            <Main>{children}</Main>
        </div>
    )
}

export default PageWrapper
