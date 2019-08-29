import React, {
    useState,
} from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../redux/actions'
import TrainStation from './components/TrainStation';
import DepartDate from './components/DepartDate';
import HighSpeed from './components/HighSpeed';
import CitySelector from '../../components/CitySelector'
import './style.scss'

interface IProps {
    from: Array<string | number>
    to: Array<string | number>
    handleExchangeFromTo: () => void
    handleSetFrom: (station: Array<string | number>) => void
    handleSetTo: (station: Array<string | number>) => void
}

const Travel = (props: IProps) => {
    const { from, to } = props
    const [visible, setCityVisible] = useState<boolean>(false)
    const [selectFromOrTo, setSelectFromOrTo] = useState<string>()

    const handleExchangeFromTo = () => {
        props.handleExchangeFromTo()
    }

    const handleStationClick = (flag: string) => {
        // 确定是出发地还是目的地，并弹出城市选择组件
        setSelectFromOrTo(flag)
        setCityVisible(true)
    }

    const handleCityBack = () => {
        setCityVisible(false)
    }

    const handleCitySelect = (station: Array<string | number>) => {
        if (selectFromOrTo === 'from') {
            console.log('起始地')
            props.handleSetFrom(station)
        } else {
            console.log('到达地')
            props.handleSetTo(station)
        }
        setCityVisible(false)
    }

    const handleSubmit = () => {
        console.log('from to', from ,to)
    }

    return (
        <div className='travel'>
            <div className="travel-img" />
            <div className="travel-form">
                <div className="travel-form--wrapper">
                    <TrainStation 
                        from={from}
                        to={to}
                        onClick={handleStationClick}
                        exchangeFromTo={handleExchangeFromTo}
                    />
                    <DepartDate 
                        
                    />
                    <HighSpeed />
                </div>
                <div className="travel-form--submit">
                    <button onClick={handleSubmit} >查询</button>
                </div>
            </div>
            <CitySelector
                visible={visible}
                onBack={handleCityBack}
                onSelect={handleCitySelect}
            />
        </div>
    )
}

const mapStateToProps = (state: any) => {
    const { from, to } = state
    return {
        from,
        to
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        handleExchangeFromTo: () => {
            dispatch(Actions.exchangeFromTo())
        },
        handleSetFrom: (station: Array<string | number>) => {
            dispatch(Actions.setFrom(station))
        },
        handleSetTo: (station: Array<string | number>) => {
            dispatch(Actions.setTo(station))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Travel)
