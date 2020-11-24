// Root of all dev-written React code
// Redux side of code
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux' // this is the super parent of all Components
import { createStore, applyMiddleware } from 'redux'
// if webpack detects pathing is not relative...
// ...it assumes you are importing from node_modules directory
// this will also automatically affect all Component's CSS
import 'materialize-css/dist/css/materialize.min.css'
import reduxThunk from 'redux-thunk'
import App from './components/App'
import reducers from './reducers'

const store = createStore(() => [], {}, applyMiddleware(reduxThunk))

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, // react component in jsx format
    document.querySelector('#root') // html id
)