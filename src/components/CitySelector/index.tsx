import React, { 
    useEffect, 
    useState 
} from 'react'
import Header from '../Header'
import { API } from '../../utils/http'
import CardView from './compontes/cardView';
import ListView from './compontes/listView';
import { historyCitys, popularCitys } from './conf'
import './style.scss'

interface IProps {
    visible: boolean
    onBack: () => void
    onSelect: (station: Array<string | number>) => void
}

const CitySeletor = (props: IProps) => {
    const [stationList, setStationList] = useState<any>('')
    const [searchKey, setSearchKey] = useState<string>('')
    const [searchCitys, setSearchCitys] = useState<Array<any[]>>([])
    const [showSearchCitys, setShowSearchCitys] = useState<boolean>(false)
    const { visible } = props

    useEffect(() => {
        const str = localStorage.getItem('ALL_STATION')
        if (str) {
            const { data } = JSON.parse(str)
            const { allStations } = data
            setStationList(allStations)
        } else {
            API.getAllStation().then((res) => {
                localStorage.setItem('ALL_STATION', JSON.stringify(res))
            })
        }
    }, [])

    const handleBack = () => {
        props.onBack()
        handleReset()
    }

    const handleClick = (station: Array<string | number>) => {
        props.onSelect(station)
        handleReset()
    }

    const handleSearchChange = (e: any) => {
        const value = e.target.value
        const res: Array<Array<string | number>> = []
        stationList.forEach((station: Array<string>, index: number) => {
            const [name, , pinYin, pinYinMin] = station
            // 匹配三种格式
            if (
                name.indexOf(value) === 0 ||
                pinYin.indexOf(value) === 0 ||
                pinYinMin.indexOf(value) === 0
            ) {
                res.push(station)
            }
        })
        if (value.trim()) {
            setShowSearchCitys(true)
        } else {
            setShowSearchCitys(false)
        }
        setSearchKey(value)
        setSearchCitys(res)
    }

    const handleReset = () => {
        setSearchKey('')
        setShowSearchCitys(false)
    }

    return visible ? (
        <div className='city-selector'>
            <Header onBack={handleBack} title='到达' />
            <div className='city-selector--input'>
                <input 
                    type='text' 
                    value={searchKey}
                    placeholder='北京/beijing/bj' 
                    onChange={handleSearchChange}
                />
            </div>
            {showSearchCitys ? (
                <ListView
                    searchCitys={searchCitys}
                    onClick={handleClick}
                />
            ) : (
                <CardView 
                    historyCitys={historyCitys}
                    popularCitys={popularCitys}
                    onClick={handleClick}
                />
            )}
        </div>
    ) : null
}

export default CitySeletor
