// 工具函数

export const formatTime = (date: Date) => {
    const y = date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()

    let ms = `${m}`
    let ds = `${d}`
    if (m < 10) {
        ms = '0' + ms
    }
    if (d < 10) {
        ds = '0' + ds
    }
    return `${y}-${ms}-${ds}`
}

export const getWeekDay = (format: string) => {
    const arr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return arr[new Date(format).getDay()]
}

export const getPreDay = (format: string) => {
    const date = new Date(format)
    const preTime = date.getTime() - 24*60*60*1000
    return formatTime(new Date(preTime))
}

export const getNextDay = (format: string) => {
    const date = new Date(format)
    const nextTime = date.getTime() + 24*60*60*1000
    return formatTime(new Date(nextTime))
}