import React from 'react'
import './style.scss'

interface IProps {
    from: Array<string | number>
    to: Array<string | number>
    onClick: Function
    exchangeFromTo: Function
}

const TrainStation = (props: IProps) => {
    const { from, to, exchangeFromTo } = props
    const [fromName] = from
    const [toName] = to
    const handleClick = (flag: string) => {
        props.onClick(flag)
    }

    return (
        <div className="train-station">
            <dd 
                className="train-station--from"
                onClick={() => handleClick('from')}
            >
                {fromName}
            </dd>
            <dt className="train-station--icon" onClick={() => exchangeFromTo()}>
                <i></i>
            </dt>
            <dd 
                className="train-station--to"
                onClick={() => handleClick('to')}
            >
                {toName}
            </dd>
        </div>
    )
}

export default TrainStation