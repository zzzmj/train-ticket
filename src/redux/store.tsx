import {
    createStore,
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import { formatTime } from '../utils/tool'

const initialState = {
    from: ["北京", "BJP", "beijing", "bj"],
    to: ["上海", "SHH", "shanghai", "sh"],
    ticketData: {},
    departTime: formatTime(new Date())
}

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store