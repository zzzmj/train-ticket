import {
    ACTION_SET_FROM,
    ACTION_SET_TO,
} from './actions';

interface IState {
    from: string,
    to: string,
    isCitySelectorVisible: boolean,
    isDateSelectorVisible: boolean,
    curSeletorLeftCity: boolean,
    cityData: any,
    isLoading: boolean,
    highSpeed: boolean,
}

const reducers = (state: any, action: any) => {
    const { type, payload } = action
    switch (type) {
        case ACTION_SET_FROM:
            return {
                ...state,
                from: payload
            }
        case ACTION_SET_TO:
            return {
                ...state,
                to: payload
            }
    }
    return state
}

export default reducers