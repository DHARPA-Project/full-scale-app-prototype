import React from 'react'
import {Switch} from 'react-router-dom'

import './App.scss'

import PrivateRoute from '../routes/PrivateRoute'
import PublicRoute from '../routes/PublicRoute'
import NotificationContainer from './common/NotificationContainer'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import IntroPage from './pages/IntroPage'
import FileUploadPage from './pages/FileUploadPage'
import FileManagementPage from './pages/FileManagementPage'
import FileDetailsPage from './pages/FileDetailsPage'
import DataProcessingPage from './pages/DataProcessingPage'
import WorkflowBuilderPage from './pages/WorkflowBuilderPage'

const App = () => {
    return (
        <div className="app">
            <Switch>
                <PrivateRoute exact path="/" component={IntroPage} />
                <PublicRoute exact path="/signup" component={RegistrationPage} />
                <PublicRoute exact path="/login" component={LoginPage} />
                <PrivateRoute exact path="/logout" component={LogoutPage} />
                <PrivateRoute exact path="/upload" component={FileUploadPage} />
                <PrivateRoute exact path="/files" component={FileManagementPage} />
                <PrivateRoute exact path="/files/:id" component={FileDetailsPage} />
                <PrivateRoute exact path="/processing" component={DataProcessingPage} />
                <PrivateRoute exact path="/composition" component={WorkflowBuilderPage} />
            </Switch>
            <NotificationContainer />
        </div>
    )
}

export default App
