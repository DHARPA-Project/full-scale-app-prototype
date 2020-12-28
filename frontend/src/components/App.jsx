import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

import HomePage from './HomePage'
import TopHeader from './TopHeader'
import TopicModellingDataInput from './TopicModellingDataInput'
import TopicModellingParameters from './TopicModellingParameters'
import TopicModellingAnalysis from './TopicModellingAnalysis'

import './App.scss'

function App() {
    return (
        <div className="app">
            <TopHeader />
            <Switch>
                <Redirect exact from="/topic-modelling" to="/topic-modelling/data-input" />
                <Route path="/topic-modelling/data-input" component={TopicModellingDataInput} />
                <Route path="/topic-modelling/parameters" component={TopicModellingParameters} />
                <Route path="/topic-modelling/analysis" component={TopicModellingAnalysis} />
                <Route exact path="/" component={HomePage} />
            </Switch>
        </div>
    )
}

export default App
