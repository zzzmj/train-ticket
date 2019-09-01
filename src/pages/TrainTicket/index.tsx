import React from 'react'
import { withRouter } from 'react-router-dom'
import * as Actions from '../../redux/actions'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import { RouteComponentProps } from 'react-router';
import './style.scss'

interface IProps extends RouteComponentProps {
    from: Array<string | number>
    to: Array<string | number>
    departTime: string
    ticketData: any
}

const TrainTicket = (props: IProps) => {
    const { from, to, departTime } = props
    const [fromStation, fromCode] = from
    const [toStation, toCode] = to

    const handleBack = () => {
        props.history.goBack()
    }

    const renderTrainTicketList = () => {
        const key = `${fromCode}${toCode}${departTime}`
        const data = props.ticketData[key] || []
        return data.map((item: any) => {
            const {
                train_id,
                start_times,
                arrive_time,
                time_used_up,
                first_seat,
                second_seat,
            } = item

            return (
                <div className="train-ticket--content">
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
                        <li>二等座: {first_seat}{Number.isNaN(Number(first_seat)) ? '': '张'}</li>
                        <li>一等座: {second_seat}{Number.isNaN(Number(second_seat)) ? '': '张'}</li>
                        <li>商务座: 无</li>
                    </ul>
                </div>
            )
        })
    }

    return (
        <div className="train-ticket">
            <Header
                title={`${fromStation} ⇀ ${toStation}`}
                onBack={handleBack}
            />
            <div className="train-ticket--date">
                <div>前一天</div>
                <div>{departTime.slice(5)}</div>
                <div>后一天</div>
            </div>
            {renderTrainTicketList()}
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
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(TrainTicket))
