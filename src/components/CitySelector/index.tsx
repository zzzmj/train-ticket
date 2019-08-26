import React, { 
    useCallback, 
    useEffect, 
    useState 
} from 'react'
import Header from '../Header'
import { API } from '../../utils/http'
import './style.scss'

interface IProps {
    visible: boolean
    onBack: () => void
}

const CitySeletor = (props: IProps) => {
    const [stationList, setStationList] = useState<any>('')
    const [searchKey, setSearchKey] = useState<string>('')
    const { visible } = props

    useEffect(() => {
        const str = localStorage.getItem('ALL_STATION')
        if (str) {
            setStationList(JSON.parse(str))
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
        setSearchKey(value)
    }

    return visible ? (
        <div className='city-selector'>
            <Header onBack={handleBack} title='到达' />
            <div className='city-selector__input'>
                <input 
                    type='text' 
                    value={searchKey}
                    placeholder='北京/beijing/bj' 
                    onChange={handleSearchChange}
                />
            </div>

            <section>

            </section>
            <section className='city-selector__history'>
                <h4>历史记录</h4>
                <ul onClick={handleClick}>
                    <li>北京</li>
                    <li>上海</li>
                </ul>
            </section>

            <section className='city-selector__popular'>
                <h4>热门城市</h4>
                <ul onClick={handleClick}>
                    <li>北京</li>
                    <li>上海</li>
                    <li>杭州</li>
                    <li>广州</li>
                    <li>南京</li>
                    <li>成都</li>
                    <li>西安</li>
                    <li>郑州</li>
                    <li>重庆</li>
                    <li>合肥</li>
                    <li>汉口</li>
                    <li>武汉</li>
                    <li>长沙</li>
                    <li>武昌</li>
                    <li>太原</li>
                    <li>苏州</li>
                    <li>厦门</li>
                    <li>南昌</li>
                    <li>沈阳</li>
                    <li>天津</li>
                    <li>深圳</li>
                </ul>
            </section>
        </div>
    ) : null
}

export default CitySeletor
