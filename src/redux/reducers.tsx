import {
    ACTION_SET_FROM,
    ACTION_SET_TO,
    ACTION_SET_DEPART_TIME
} from './actions';

interface IState {
    from: string,
    to: string,

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
        case ACTION_SET_DEPART_TIME:
            return {
                ...state,
                departTime: payload
            }
    }
    return state
}

export default reducers