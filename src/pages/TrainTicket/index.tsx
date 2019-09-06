import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import * as Actions from '../../redux/actions'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import DateSelector from '../../components/DateSelector'
import { RouteComponentProps } from 'react-router';
import { 
    getWeekDay, 
    formatTime,
    getPreDay,
    getNextDay,
} from '../../utils/tool'
import './style.scss'


interface IProps extends RouteComponentProps {
    from: Array<string | number>
    to: Array<string | number>
    departTime: string
    ticketData: any
    handleSetTicketData: () => void
    handleSetDepartTime: (dateString: string) => void
}

const TrainTicket = (props: IProps) => {
    const { 
        from,
        to,
        departTime,
        ticketData
    } = props
    const [dateVisible, setDateVisible] = useState<boolean>(false)
    const [fromStation, fromCode] = from
    const [toStation, toCode] = to
    

    useEffect(() => {
        props.handleSetTicketData()
    }, [from, to, departTime])

    /* 头部返回，日期相关事件 */
    const handleBack = () => {
        props.history.goBack()
    }

    const hanldeDateClick = () => {
        setDateVisible(true)
    }

    const handleDateBack = () => {
        setDateVisible(false)
    }

    const handleDateSelct = (date: Date) => {
        // 更新车票请求参数
        props.handleSetDepartTime(formatTime(date))
    }

    const handlePreDayClick = () => {
        const preDay = getPreDay(departTime)
        props.handleSetDepartTime(preDay)
    }

    const handleNextDayClick = () => {
        const nextDay = getNextDay(departTime)
        props.handleSetDepartTime(nextDay)
    }

    /* 底部过滤事件 */
    const handleFilter = () => {
        
    }

    const handleFilterDepartTime = () => {

    }

    const handleFilterSpendTime = () => {

    }

    const handleFilterPrice = () => {

    }

    const seatFormat = (seat: string) => {
        if (seat) {
            // 1. 可能是有
            // 2. 可能是数字
            if (Number.isNaN(parseInt(seat))) {
                return seat
            } else {
                return seat + '张'
            }
        } else {
            return '无'
        }
    }

    const renderTrainTicketList = () => {
        const key = `${fromCode}${toCode}${departTime}`
        const dataSource = ticketData[key] || []
        return dataSource.map((item: any) => {
            const {
                train_id,
                start_times,
                arrive_time,
                time_used_up,
                first_seat,
                second_seat,
                business_seat,
            } = item

            return (
                <div key={train_id} className="train-ticket--content">
                    <ul className="train-ticket--content__card">
                        <li className="from">
                            <strong>{start_times}</strong>
                            <p>{fromStation}</p>
                        </li>
                        <li className="spend-time">
                            <p>{time_used_up}</p>
                            <div>
                                <i></i>
                                <span></span>
                                <i></i>
                            </div>
                            <p className="train-id">
                                {train_id}
                                <i></i>
                            </p>
                            
                        </li>
                        <li className="to">
                            <p>{arrive_time}</p>
                            <p>{toStation}</p>
                        </li>
                        <li className="price">
                            <span>¥</span>
                            <strong>553</strong>起
                        </li>
                    </ul>

                    <ul className="train-ticket--content__ticket">
                        <li>二等座: {seatFormat(first_seat)}</li>
                        <li>一等座: {seatFormat(second_seat)}</li>
                        <li>商务座: {seatFormat(business_seat)}</li>
                    </ul>
                </div>
            )
        })
    }

    return (
        <div className="train-ticket">
            {!dateVisible && (
                <div className="train-ticket--wrap">
                    <div className="train-ticket--header">
                        <Header
                            title={`${fromStation} ⇀ ${toStation}`}
                            onBack={handleBack}
                        />
                        <div className="train-ticket--date">
                            <div onClick={handlePreDayClick}>前一天</div>
                            <div onClick={hanldeDateClick}>
                                <i />
                                <span>{departTime.slice(5)} </span>
                                <span>{getWeekDay(departTime)}</span>
                            </div>
                            <div onClick={handleNextDayClick}>后一天</div>
                        </div>
                    </div>
                    {renderTrainTicketList()}
                    <div className="train-ticket--footer">
                    <div className="train-ticket--filter">
                        <ul className="train-ticket--filter__list">
                            <li onClick={handleFilter}>筛选</li>
                            <li onClick={handleFilterDepartTime}>出发(早-晚)</li>
                            <li onClick={handleFilterSpendTime}>耗时(短-长)</li>
                            <li onClick={handleFilterPrice}>价格(低-高)</li>
                        </ul>
                    </div>
                </div>
                </div>
            )}

            <DateSelector
                visible={dateVisible}
                onBack={handleDateBack}
                onSelect={handleDateSelct}
            />
        </div>
    )
}

const mapStateToProps = (state: any) => {
    const { from, to, departTime, ticketData } = state
    return {
        from,
        to,
        departTime,
        ticketData
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        handleSetFrom: (station: Array<string | number>) => {
            dispatch(Actions.setFrom(station))
        },
        handleSetTo: (station: Array<string | number>) => {
            dispatch(Actions.setTo(station))
        },
        handleSetDepartTime: (dateString: string) => {
            dispatch(Actions.setDepartTime(dateString))
        },
        handleSetTicketData: () => {
            dispatch(Actions.setTicketData())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(TrainTicket))
