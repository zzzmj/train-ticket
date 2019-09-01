import {
    ACTION_SET_FROM,
    ACTION_SET_TO,
    ACTION_SET_DEPART_TIME,
    ACTION_SET_TICKET_DATA
} from './actions';

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
        case ACTION_SET_TICKET_DATA:
            const { key, value } = payload
            const ticket = state['ticketData'] || {}
            return {
                ...state,
                ticketData: {
                    ...ticket,
                    [key]: value
                }
            }
    }
    return state
}

export default reducers