import {Route, Switch} from 'react-router-dom'

import HomePage from './HomePage'
import TopicModellingPage from './TopicModellingPage'

import './App.scss'

function App() {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/topic-modelling" component={TopicModellingPage} />
        </Switch>
    )
}

export default App
