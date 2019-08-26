export const ACTION_SET_FROM = 'SET_FROM'
export const ACTION_SET_TO = 'SET_TO'
export const ACTION_SET_EXCHANGEFROMTO = 'SET_EXCHANGEFROMTO'
export const ACTION_SET_ISCITYSELECTORVISIBLE = 'SET_ISCITYSELECTORVISIBLE'
export const ACTION_SET_ISDATESELECTORVISIBLE = 'SET_ISDATESELECTORVISIBLE'
export const ACTION_SET_CURSELETORLEFTCITY = 'SET_CURSELETORLEFTCITY'
export const ACTION_SET_CITYDATA = 'SET_CITYDATA'
export const ACTION_SET_ISLOADING = 'SET_ISLOADING'
export const ACTION_SET_HIGHSPEED = 'SET_HIGHSPEED'

export const setFrom = (from: string) => ({
    type: ACTION_SET_FROM,
    payload: from
})

export const setTo = (to: string) => ({
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