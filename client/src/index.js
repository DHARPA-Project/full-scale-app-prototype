import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'

import ContextProvider from './context'
import App from './components/App'

import 'semantic-ui-css/semantic.min.css'
import './index.scss'

ReactDOM.render(
    <ContextProvider>
        <Router>
            <App />
        </Router>
    </ContextProvider>,
    document.getElementById('root')
)
