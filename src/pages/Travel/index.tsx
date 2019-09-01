import React, {
    useState,
} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as Actions from '../../redux/actions'
import TrainStation from './components/TrainStation';
import DepartDate from './components/DepartDate';
import HighSpeed from './components/HighSpeed';
import CitySelector from '../../components/CitySelector'
import DateSelector from '../../components/DateSelector';
import { formatTime } from '../../utils/tool'
import { API } from '../../utils/http'
import './style.scss'
import { RouteComponentProps } from 'react-router';

interface IProps extends RouteComponentProps {
    from: Array<string | number>
    to: Array<string | number>
    departTime: string
    handleExchangeFromTo: () => void
    handleSetFrom: (station: Array<string | number>) => void
    handleSetTo: (station: Array<string | number>) => void
    handleSetDepartTime: (dateString: string) => void
    handleSetTicketData: (ticket: { key: string, value: JSON }) => void
}

const Travel = (props: IProps) => {
    const { from, to, departTime} = props
    const [cityVisible, setCityVisible] = useState<boolean>(false)
    const [dateVisible, setDateVisible] = useState<boolean>(false)
    const [selectFromOrTo, setSelectFromOrTo] = useState<string>()

    const handleExchangeFromTo = () => {
        props.handleExchangeFromTo()
    }

    const handleStationClick = (flag: string) => {
        // 确定是出发地还是目的地，并弹出城市选择组件
        setSelectFromOrTo(flag)
        setCityVisible(true)
    }

    const handleDateClick = () => {
        setDateVisible(true)
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
    
    const handleDateSelct = (date: Date) => {
        props.handleSetDepartTime(formatTime(date))
    }
    
    const handleBack = () => {
        setCityVisible(false)
        setDateVisible(false)
    }

    const handleSubmit = () => {
        // 拿到出发地
        const [, fromCode] = from
        const [, toCode] = to
        console.log('from to', from ,to, departTime)
        const req = {
            from_station: fromCode,
            to_station: toCode,
            depart_time: departTime
        }
        API.getTrainList(req).then((res: any) => {
            const { data } = res
            // 以起始地和日期作为车票对象索引
            const key = `${fromCode}${toCode}${departTime}`
            props.handleSetTicketData({
                key,
                value: data
            })
            props.history.push('/train/list')
        })
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
                        time={departTime}
                        onClick={handleDateClick}
                    />
                    <HighSpeed />
                </div>
                <div className="travel-form--submit">
                    <button onClick={handleSubmit} >查询</button>
                </div>
            </div>
            <CitySelector
                visible={cityVisible}
                onBack={handleBack}
                onSelect={handleCitySelect}
            />
            <DateSelector
                visible={dateVisible}
                onBack={handleBack}
                onSelect={handleDateSelct}
            />
        </div>
    )
}

const mapStateToProps = (state: any) => {
    const { from, to, departTime } = state
    return {
        from,
        to,
        departTime
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
        },
        handleSetDepartTime: (dateString: string) => {
            dispatch(Actions.setDepartTime(dateString))
        },
        handleSetTicketData: (ticket: { key: string, value: JSON }) => {
            dispatch(Actions.setTicketData(ticket))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Travel))