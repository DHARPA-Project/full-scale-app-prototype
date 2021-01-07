import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'

import {Context} from '../context'
import {isAuthenticated} from '../utils/auth'

const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const {loggedInUser} = useContext(Context)

    return (
        <Route
            {...rest}
            render={routeProps =>
                isAuthenticated(loggedInUser) ? (
                    // if logged in, show private routes
                    <RouteComponent {...routeProps} />
                ) : (
                    // else redirect user to login page instead
                    <Redirect to={'/login'} />
                )
            }
        />
    )
}

export default PrivateRoute
