import {
    createStore,
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const initialState = {
    from: '北京',
    to: '上海',
    isCitySelectorVisible: false,
    isDateSelectorVisible: false,
    curSeletorLeftCity: false,
    cityData: "",
    isLoading: false,
    highSpeed: false,
}

const store = createStore(
    reducers,
    initialState,
    applyMiddleware(thunk)
)

export default store