import React from 'react'

import {VscTriangleDown} from 'react-icons/vsc'

import './ModuleCard.scss'

const ModuleCard = ({classes, background, children}) => {
    return (
        <div
            className={`module-card-wrapper${
                classes && classes.includes('extensible') ? ' extensible' : ''
            }`}
        >
            <div
                className={`module-card${classes ? ` ${classes}` : ''}`}
                style={{background: background}}
            >
                <div className="module-card-input">
                    <VscTriangleDown />
                </div>
                <div className="module-card-status" />
                {children}
            </div>
            <div className="module-card-mirror"></div>
        </div>
    )
}

export default ModuleCard
