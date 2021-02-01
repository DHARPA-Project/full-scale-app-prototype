import React from 'react'

import './LoadingIndicator.scss'

const LoadingIndicator = ({size}) => {
    return (
        <div className="loading-indicator" style={size ? {width: size} : null}>
            <div className="loading-indicator-square">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    )
}

export default LoadingIndicator
