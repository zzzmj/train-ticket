import React from 'react'
import './style.scss'

interface IProps {
    from: string
    to: string
    onClick: Function
    exchangeFromTo: Function
}

const TrainStation = (props: IProps) => {
    const { from, to, exchangeFromTo } = props

    const handleClick = () => {
        props.onClick()
    }

    return (
        <div className="train-station">
            <dd 
                className="train-station--from"
                onClick={() => handleClick()}
            >
                {from}
            </dd>
            <dt className="train-station--icon" onClick={() => exchangeFromTo()}>
                <i></i>
            </dt>
            <dd 
                className="train-station--to"
                onClick={() => handleClick()}
            >
                {to}
            </dd>
        </div>
    )
}

export default TrainStation