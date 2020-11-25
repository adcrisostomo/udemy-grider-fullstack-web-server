import { FETCH_USER } from '../actions/types'

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            // if user is logged in, return payload containig user ID...
            // ...else return false
            return action.payload || false
        default:
            return state
    }
}