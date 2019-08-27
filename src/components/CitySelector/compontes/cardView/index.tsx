import React from 'react'
import './style.scss'

interface IProps {
    historyCitys: Array<any>
    popularCitys: Array<any>
    onClick: Function
}


const CardView = (props: IProps) => {
    const { popularCitys, historyCitys } = props

    const renderPopular = (data: Array<String>) => {
        return data.map((item: String, index) => {
            return <li key={index}>{item}</li>
        })
    }

    const renderHistoryCitys = (data: Array<String>) => {
        return data.map((item: String, index) => {
            return <li key={index}>{item}</li>
        })
    }

    const handleClick = (e: any) => {
        props.onClick(e)
    }

    return (
        <div>
            <section className='city-selector--history'>
                <h4>历史记录</h4>
                <ul onClick={handleClick}>
                    {renderHistoryCitys(historyCitys)}
                </ul>
            </section>

            <section className='city-selector--popular'>
                <h4>热门城市</h4>
                <ul onClick={handleClick}>
                    {renderPopular(popularCitys)}
                </ul>
            </section>
        </div>
    )
}

export default CardView
