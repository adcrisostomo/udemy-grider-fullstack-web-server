// Root of all dev-written React code
// Redux side of code
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux' // this is the super parent of all Components
import { createStore, applyMiddleware } from 'redux'
import App from './components/App'

const store = createStore(() => [], {}, applyMiddleware())

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, // react component in jsx format
    document.querySelector('#root') // html id
)