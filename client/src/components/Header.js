import React, { Component } from 'react'
import { connect } from 'react-redux' // allows Components to use action creators
import { Link } from 'react-router-dom'
import Payments from './Payments'

class Header extends Component {
    renderContent () { // determine which Header content should be displayed based on auth's value
        switch (this.props.auth) {
            case null: // the Component is still checking if user is logged in or not
                return
            case false: // the Component finds user is logged out
                return (
                    <li>
                        <a href='/auth/google'>
                            Login with Google
                        </a>
                    </li>
                )
            default: // the Component finds user is logged in
                return  [
                    <li key='1'>
                        <Payments />
                    </li>,
                    <li key='2'>
                        <a href='/api/logout'>
                            Logout
                        </a>
                    </li>
                ]
        }
    }

    render () {
        return (
            <nav>
                <div className='nav-wrapper'>
                    <Link
                        to={this.props.auth ? '/surveys' : '/'}
                        className='left brand-logo'
                    >
                        Emaily
                    </Link>
                    <ul className='right'>
                        { this.renderContent() }
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps ({ auth }) {
    return { auth }
}

// connect auth reducer to Header as its props
export default connect(mapStateToProps)(Header)