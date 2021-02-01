import React, {useContext, useEffect} from 'react'

import './PageWrapper.scss'
import {Context} from '../../context'

import NavBar from '../NavBar'
import ProfileBubble from '../ProfileBubble'
import Main from './Main'

const PageWrapper = ({children}) => {
    const {removeAllNotifications} = useContext(Context)

    useEffect(() => {
        return removeAllNotifications
    }, [removeAllNotifications])

    return (
        <div className="page-wrapper">
            <NavBar />
            <ProfileBubble />
            <Main>{children}</Main>
        </div>
    )
}

export default PageWrapper
