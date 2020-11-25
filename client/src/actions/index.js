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