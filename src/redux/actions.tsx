export const ACTION_SET_FROM = 'SET_FROM'
export const ACTION_SET_TO = 'SET_TO'
export const ACTION_SET_EXCHANGEFROMTO = 'SET_EXCHANGEFROMTO'
export const ACTION_SET_DEPART_TIME = 'DEPART_TIME'



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