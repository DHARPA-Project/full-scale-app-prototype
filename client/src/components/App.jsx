import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

import PrivateRoute from '../routes/PrivateRoute'
import PublicRoute from '../routes/PublicRoute'
import HomePage from './HomePage'
import TopHeader from './TopHeader'
import TopicModellingDataInput from './TopicModellingDataInput'
import TopicModellingParameters from './TopicModellingParameters'
import TopicModellingAnalysis from './TopicModellingAnalysis'
import NotificationContainer from './common/NotificationContainer'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'

import './App.scss'

const App = () => {
    return (
        <div className="app">
            {/* <TopHeader /> */}
            <Switch>
                <Redirect exact from="/topic-modelling" to="/topic-modelling/data-input" />
                <PublicRoute exact path="/signup" component={RegistrationPage} />
                <PublicRoute exact path="/login" component={LoginPage} />
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
                <PrivateRoute exact path="/" component={HomePage} />
            </Switch>
            <NotificationContainer />
        </div>
    )
}

export default App
