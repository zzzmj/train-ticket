import React, {
    useCallback, useState
} from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../redux/actions'
import TrainStation from './components/TrainStation';
import DepartDate from './components/DepartDate';
import HighSpeed from './components/HighSpeed';
import CitySelector from '../../components/CitySelector'
import './style.scss'

interface IProps {
    from: string
    to: string
    handleExchangeFromTo: () => void
}

const Travel = (props: IProps) => {
    const [visible, setCityVisible] = useState<boolean>(false)
    const { from, to } = props

    const handleExchangeFromTo = useCallback(() => {
        props.handleExchangeFromTo()
    }, [])

    const handleStationClick = useCallback(() => {
        setCityVisible(true)
    }, [])

    const handleCityBack = useCallback(() => {
        setCityVisible(false)
    }, [])

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
                    <button>查询</button>
                </div>
            </div>
            <CitySelector 
                visible={visible}
                onBack={handleCityBack}
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Travel)
