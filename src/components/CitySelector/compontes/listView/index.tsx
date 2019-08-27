import React from 'react'
import './style.scss'

interface IProps {
    searchCitys: Array<Array<string | number>>
    onClick: Function
}

const ListView = (props: IProps) => {
    const { searchCitys } = props

    const renderSearchCitys = (data: Array<Array<string | number>>) => {
        return data.map((item: Array<string | number>, index) => {
            
            return <li key={index}>{item}</li>
        })
    }

    const handleClick = (e: any) => {
        props.onClick(e)
    }

    return (
        <div className="city-selector--list">
            <ul onClick={handleClick}>
                {renderSearchCitys(searchCitys)}
            </ul>
        </div>
    )
}

export default ListView
