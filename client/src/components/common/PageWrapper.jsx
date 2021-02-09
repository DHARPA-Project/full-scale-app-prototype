import React, {useContext, useEffect} from 'react'

import './PageWrapper.scss'
import {Context} from '../../context'

import NavBar from '../NavBar'

import Main from './Main'
import CornerMenu from '../CornerMenu'

const PageWrapper = ({children}) => {
    const {removeAllNotifications} = useContext(Context)

    useEffect(() => {
        return removeAllNotifications
    }, [removeAllNotifications])

    return (
        <div className="page-wrapper">
            <NavBar />
            <CornerMenu />
            <Main>{children}</Main>
        </div>
    )
}

export default PageWrapper
