import React from 'react'
import './style.scss'

interface IProps {
    historyCitys: Array<any>
    popularCitys: Array<any>
    onClick: Function
}


const CardView = (props: IProps) => {
    const { popularCitys, historyCitys } = props
    const renderPopular = (data: Array<any>) => {
        return data.map((station: Array<string | number>, index) => {
            const [name] = station
            return (
                <li 
                    key={index}
                    onClick={() => handleClick(station)}
                >
                    {name}
                </li>
            )
        })
    }

    const renderHistoryCitys = (data: Array<any>) => {
        return data.map((station: Array<string | number>, index) => {
            const [name] = station
            console.log('**debug station', station)
            return (
                <li 
                    key={index}
                    onClick={() => handleClick(station)}
                >
                    {name}
                </li>
            )
        })
    }

    const handleClick = (station: Array<string | number>) => {
        props.onClick(station)
    }

    return (
        <div>
            <section className='city-selector--history'>
                <h4>历史记录</h4>
                <ul>
                    {renderHistoryCitys(historyCitys)}
                </ul>
            </section>

            <section className='city-selector--popular'>
                <h4>热门城市</h4>
                <ul>
                    {renderPopular(popularCitys)}
                </ul>
            </section>
        </div>
    )
}

export default CardView
