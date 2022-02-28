import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

ReactDOM.render(
    <Container>
        <Router>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>
    </Container>
    , document.getElementById('root'))