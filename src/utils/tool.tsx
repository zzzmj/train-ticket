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

export const compareTime = (preDay: string) => {
    const curDay = formatTime(new Date())
    return preDay >= curDay
}

export const getMinPrice = (price: any) => {
    let min = 9999
    Object.keys(price).forEach(key => {
        let p = price[key]
        if (p.includes('¥')) {
            console.log('p', p)
            let t = parseInt(p.slice(1))
            if (!Number.isNaN(t)) {
                min = Math.min(min, t)
            }
            console.log('t, min', t, min)
        }
    })

    if (min === 9999999) return ''
    else return min
}

export const formatSeat = (seat: string) => {
    if (seat) {
        // 1. 可能是有
        // 2. 可能是数字
        if (Number.isNaN(parseInt(seat))) {
            return seat
        } else {
            return seat + '张'
        }
    } else {
        return '无'
    }
}

export const getSeatType = (trainId: string) => {
    // 如果是 K Z T开头的开车， 显示座位类型
    if (trainId[0] === 'K' || trainId[0] === 'Z' || trainId[0] === 'T') {
        return ['硬座', '硬卧', '软卧', '无座']
    } else {
        return ['一等座', '二等座', '商务座', '无座']
    }
}

export const getSeatList = (item: any) => {
    const { 
        train_id,
        hard_seat,
        hard_sleep,
        soft_sleep,
        no_seat,
        first_seat,
        second_seat,
        business_seat,
    } = item
    if (train_id[0] === 'K' || train_id[0] === 'Z' || train_id[0] === 'T') {
        return [
            `硬座: ${formatSeat(hard_seat)}`,
            `硬卧: ${formatSeat(hard_sleep)}`,
            `软卧: ${formatSeat(soft_sleep)}`,
            `无座: ${formatSeat(no_seat)}`,
        ]
    } else {
        return [
            `一等座: ${formatSeat(first_seat)}`,
            `二等座: ${formatSeat(second_seat)}`,
            `商务座: ${formatSeat(business_seat)}`,
            `无座: ${formatSeat(no_seat)}`,
        ]
    }
}