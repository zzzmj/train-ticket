import React, { 
    useCallback, 
    useEffect, 
    useState 
} from 'react'
import Header from '../Header'
import { API } from '../../utils/http'
import './style.scss'
import CardView from './compontes/cardView';
import ListView from './compontes/listView';

interface IProps {
    visible: boolean
    onBack: () => void
}

const historyCitys = ["北京","上海"]
const popularCitys = ["北京","上海","杭州","广州","南京","成都","西安","郑州","重庆","合肥","汉口","武汉","长沙","武昌","太原","苏州","厦门","南昌","沈阳","天津","深圳",]
// const searchCitys = ["杭州","广州","南京","成都","西安","郑州","重庆","合肥"]

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

    const handleBack = useCallback(() => {
        props.onBack()
    }, [])

    const handleClick = useCallback((e) => {
        console.log('e', e.target)
    }, [])

    const handleSearchChange = (e: any) => {
        const value = e.target.value
        const res: Array<Array<string | number>> = []
        stationList.forEach((station: Array<string>, index: number) => {
            const [name, pinYin, pinYinMin] = station
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
