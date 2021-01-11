import React, {useContext, useEffect} from 'react'

import {Context} from '../../context'

const LogoutPage = () => {
    const {saveLoggedInUser} = useContext(Context)

    useEffect(() => {
        saveLoggedInUser(null)
    }, [saveLoggedInUser])

    return null
}

export default LogoutPage
