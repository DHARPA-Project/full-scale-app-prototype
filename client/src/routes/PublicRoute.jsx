import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'

import {Context} from '../context'
import {isAuthenticated} from '../utils/auth'

const PublicRoute = ({component: RouteComponent, ...rest}) => {
    const {loggedInUser} = useContext(Context)

    return (
        <Route
            {...rest}
            render={routeProps =>
                // if already logged in, redirect from sign(up/in) to home
                isAuthenticated(loggedInUser) ? (
                    <Redirect to={'/'} />
                ) : (
                    // otherwise show the sign(up/in) page
                    <RouteComponent {...routeProps} />
                )
            }
        />
    )
}

export default PublicRoute
