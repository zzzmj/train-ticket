import { API } from "../utils/http";


export const ACTION_SET_FROM = 'SET_FROM'
export const ACTION_SET_TO = 'SET_TO'
export const ACTION_SET_EXCHANGEFROMTO = 'SET_EXCHANGEFROMTO'
export const ACTION_SET_DEPART_TIME = 'DEPART_TIME'
export const ACTION_SET_TICKET_DATA = 'TICKET_DATA'

export const setFrom = (from: Array<string | number>) => ({
    type: ACTION_SET_FROM,
    payload: from
})

export const setTo = (to: Array<string | number>) => ({
    type: ACTION_SET_TO,
    payload: to
})

export const exchangeFromTo = () => {
    return (dispatch: any, getState: any) => {
        const { from, to } = getState()
        dispatch(setFrom(to))
        dispatch(setTo(from))
    }
}

export const setDepartTime = (dateString: string) => ({
    type: ACTION_SET_DEPART_TIME,
    payload: dateString
})

export const setTicketData = () => {
    return (dispatch: any, getState: any) => {
        const { from, to, departTime } = getState()
        const [, fromCode] = from
        const [, toCode] = to
        const key = `${fromCode}${toCode}${departTime}`

        const { ticketData } = getState()

        // 如果key存在了就不重新发送请求
        if (ticketData[key]) {
            return null;
        }

        const ticketParams = {
            from_station: fromCode,
            to_station: toCode,
            depart_time: departTime,
        }
        API.getTrainList(ticketParams).then((res: any) => {
            const { data } = res
            return dispatch({
                type: ACTION_SET_TICKET_DATA,
                payload: {
                    key,
                    value: data
                }
            })
        })
        
    }
}
