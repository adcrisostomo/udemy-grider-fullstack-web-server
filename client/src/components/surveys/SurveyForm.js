// shows a form for a user to add input
import _ from 'lodash' // for mapping arrays
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'

const FIELDS = [
    { label: 'Survey Title', name: 'title', errorMessage: 'Please provide a survey title' },
    { label: 'Subject Line', name: 'subject', errorMessage: 'Please provide a subject' },
    { label: 'Email Body', name: 'body', errorMessage: 'Please provide an email body' },
    { label: 'Recipient List', name: 'emails', errorMessage: 'Please provide at least one (1) email address' },
]

class SurveyForm extends Component {
    renderFields () {
        return _.map(FIELDS, ({ label, name }) => {
            return  <Field
                component={SurveyField}
                type='text'
                label={label}
                name={name}
                key={name}
            />
        })
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={this.props.handleSubmit(values => console.log(values))}
                >
                    { this.renderFields() }
                    <Link
                        to='/surveys'
                        className='red btn-flat white-text'
                    >
                        Cancel
                    </Link>
                    <button
                        type='submit'
                        className='teal btn-flat right white-text'
                    >
                        Next <i className='material-icons right'>done</i>
                    </button>
                </form>
            </div>
        )
    }
}

function validate (values) {
    const errors = {}

    errors.emails = validateEmails(values.emails || '')

    _.each(FIELDS, ({ name, errorMessage }) => {
        if (!values[name]) {
            errors[name] = errorMessage
        }
    })

    return errors
}

export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm)