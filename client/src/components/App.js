import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux' // allows Components to use action creators
import * as actions from '../actions'
// import Components
import Header from './Header'
import Landing from './Landing'
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

class App extends Component { // this makes use of React lifecycle methods
    componentDidMount () {
        this.props.fetchUser()
    }

    render () {
        return (
            <div className='container'>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path='/' component={Landing} />
                        <Route exact path='/surveys' component={Dashboard} />
                        <Route path='/surveys/new' component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        )   
    }
}

export default connect(null, actions)(App) // assign actions to App as its props