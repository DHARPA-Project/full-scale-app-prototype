import {Route, Switch} from 'react-router-dom'

import HomePage from './components/HomePage'
import TopicModellingPage from './components/TopicModellingPage'

import './App.css'

function App() {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/topic-modelling" component={TopicModellingPage} />
        </Switch>
    )
}

export default App
