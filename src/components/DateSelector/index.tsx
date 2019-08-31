import React from 'react'
import Header from '../Header'
import './style.scss'

interface IProps {
    visible: boolean
    onBack: () => void
    onSelect: (date: Date) => void
}

const DateSelector = (props: IProps) => {
    const { visible } = props

    const handleBack = () => {
        props.onBack()
    }

    const handleSelect = (curDate: Date) => {
        props.onSelect(curDate)
        handleBack()
    }

    const renderDaysOfMonth = (curDate: Date, count: number) => {
        // 获取这个月的第一天是星期几
        const curYear = curDate.getFullYear()
        const curMonth = curDate.getMonth()
        // 计算今天是多少号
        const daysOfMonth = new Date().getDate()
        const t = new Date(curYear, curMonth)
        // 计算这个月有多少天
        const total = new Date(curYear, curMonth+1, 0).getDate()
        let initWeekDay = t.getDay()
        console.log('init', daysOfMonth)
        let res = []
        // 在这个月第一天前插入占位节点
        while(initWeekDay > 0) {
            res.push((
                <li key={0-initWeekDay} className="yx-day invalid" ></li>
            ))
            initWeekDay--
        }
        for (let cnt = 1; cnt <= total; cnt++) {
            if (cnt < daysOfMonth && count === 0) {
                res.push((
                    <li 
                        key={cnt}
                        className="yx-day invalid"
                    >
                        {cnt}
                    </li>
                ))
            } else {
                res.push((
                    <li 
                        key={cnt}
                        className="yx-day"
                        onClick={() => handleSelect(new Date(curYear, curMonth, cnt))}
                    >
                        {cnt}
                    </li>
                ))
            }
        }
        return res
    }

    const renderMonths = (count: number) => {
        // count是渲染的个数
        const curDate = new Date()
        const curYear = curDate.getFullYear()
        const curMonth = curDate.getMonth()
        console.log('curMonth')
        const res = []
        for (let i = 0; i < count; i++) {
            res.push((
                <div key={i} className="yx-container">
                    <h3 className='yx-month'>{`${curYear}年${curMonth+i+1}月`}</h3>
                    <ul className="yx-week">
                        <li>日</li>
                        <li>一</li>
                        <li>二</li>
                        <li>三</li>
                        <li>四</li>
                        <li>五</li>
                        <li>六</li>
                    </ul>
                    <ul className="yx-days-wrap">
                        {renderDaysOfMonth(new Date(curYear, curMonth+i), i)}
                    </ul>
                </div>
            ))
        }
        return res
    }

    return visible ? (
        <div className='calendar'>
            <Header onBack={handleBack} title='选择出发日期' />
            {renderMonths(3)}
        </div>
    ) : null
}

export default DateSelector
