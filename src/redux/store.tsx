import {
    createStore,
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { formatTime } from '../utils/tool'

const initialState = {
    from: ['北京', '', '', ''],
    to: ['上海', '', '', ''],
    departTime: formatTime(new Date())
}

const store = createStore(
    reducers,
    initialState,
    applyMiddleware(thunk)
)

export default store