import React from 'react'
import {Redirect, Switch} from 'react-router-dom'

import PrivateRoute from '../routes/PrivateRoute'
import PublicRoute from '../routes/PublicRoute'
import NotificationContainer from './common/NotificationContainer'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import IntroPage from './pages/IntroPage'
import FileUploadPage from './pages/FileUploadPage'
import FileManagementPage from './pages/FileManagementPage'
import DataProcessingPage from './pages/DataProcessingPage'

import './App.scss'

const App = () => {
    return (
        <div className="app">
            <Switch>
                <Redirect exact from="/topic-modelling" to="/topic-modelling/data-input" />
                <PublicRoute exact path="/signup" component={RegistrationPage} />
                <PublicRoute exact path="/login" component={LoginPage} />
                <PrivateRoute exact path="/logout" component={LogoutPage} />
                <PrivateRoute exact path="/" component={IntroPage} />
                <PrivateRoute exact path="/file-upload" component={FileUploadPage} />
                <PrivateRoute exact path="/file-management" component={FileManagementPage} />
                <PrivateRoute exact path="/data-processing" component={DataProcessingPage} />
            </Switch>
            <NotificationContainer />
        </div>
    )
}

export default App
