import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

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
                <Route path="/signup" component={RegistrationPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/topic-modelling/data-input" component={TopicModellingDataInput} />
                <Route path="/topic-modelling/parameters" component={TopicModellingParameters} />
                <Route path="/topic-modelling/analysis" component={TopicModellingAnalysis} />
                <Route exact path="/" component={HomePage} />
            </Switch>
            <NotificationContainer />
        </div>
    )
}

export default App
