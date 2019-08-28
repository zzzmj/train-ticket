import React from 'react'
import './style.scss'

interface IProps {
    searchCitys: Array<Array<string | number>>
    onClick: Function
}

const ListView = (props: IProps) => {
    const { searchCitys } = props

    const renderSearchCitys = (data: Array<Array<string | number>>) => {
        return data.map((station: Array<string | number>) => {
            const [name, cityCode,] = station
            return (
                <li
                    key={cityCode}
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
        <div className="city-selector--list">
            <ul>
                {renderSearchCitys(searchCitys)}
            </ul>
        </div>
    )
}

export default ListView
