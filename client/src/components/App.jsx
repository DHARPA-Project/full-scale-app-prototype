import React from 'react'
import {Redirect, Switch} from 'react-router-dom'

import PrivateRoute from '../routes/PrivateRoute'
import PublicRoute from '../routes/PublicRoute'
import TopicModellingDataInput from './TopicModellingDataInput'
import TopicModellingParameters from './TopicModellingParameters'
import TopicModellingAnalysis from './TopicModellingAnalysis'
import NotificationContainer from './common/NotificationContainer'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import IntroPage from './pages/IntroPage'
import FileUploadPage from './pages/FileUploadPage'

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
                <PrivateRoute
                    exact
                    path="/topic-modelling/data-input"
                    component={TopicModellingDataInput}
                />
                <PrivateRoute
                    path="/topic-modelling/parameters"
                    component={TopicModellingParameters}
                />
                <PrivateRoute path="/topic-modelling/analysis" component={TopicModellingAnalysis} />
            </Switch>
            <NotificationContainer />
        </div>
    )
}

export default App
