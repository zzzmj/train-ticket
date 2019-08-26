import React from 'react'
import './style.scss'

interface IProps {
    title: string
    onBack: () => void
}

const Header = (props: IProps) => {
    const { title } = props
    
    const handleBack = () => {
        props.onBack()
    }

    return (
        <div className="header">
            <span
                className="header-icon"
                onClick={handleBack}
            >
                <i className="header-icon--back"></i>
            </span>
            <h3>{title}</h3>
        </div>
    )
}

export default Header