import React from 'react'
import './style.scss'

interface IProps {
    time: string
    onClick: () => void
}

const DepartDate = (props: IProps) => {
    const { time } = props
    const handleClick = () => {
        props.onClick()
    }

    const [, month, day] = time.split('-')
    return (
        <div onClick={handleClick} className="depart-date">
            <div className="depart-date--start">{month}月{day}日</div>
            <div className="depart-date--end">周五</div>
        </div>
    )
}

export default DepartDate