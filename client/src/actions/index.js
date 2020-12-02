import axios from 'axios'
import { FETCH_USER } from './types'

// redux-thunk sees that this returns a function...
export const fetchUser = () => async dispatch => {
    // ...so it will give the Dev the access to the dispatch function
    const res = await axios.get('/api/current-user')

    dispatch({
        type: FETCH_USER,
        payload: res.data
    })
}

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token)

    dispatch({
        type: FETCH_USER,
        payload: res.data
    })
}

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values)

    // redirect to this path
    history.push('/surveys')

    dispatch({
        type: FETCH_USER,
        payload: res.data
    })
}