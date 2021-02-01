import {useContext, useEffect} from 'react'

import {Context} from '../../context'

const LogoutPage = () => {
    const {saveLoggedInUser, removeAllNotifications} = useContext(Context)

    useEffect(() => {
        saveLoggedInUser(null)
        return removeAllNotifications
    }, [saveLoggedInUser, removeAllNotifications])

    return null
}

export default LogoutPage
