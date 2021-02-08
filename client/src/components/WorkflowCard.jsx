import React from 'react'
import {Link} from 'react-router-dom'

import './WorkflowCard.scss'

const WorkflowCard = ({name, description, icon}) => {
    return (
        <div className="workflow-card">
            <div className="image-container" data-tex="Design">
                <img src={icon} alt={name} />
            </div>
            <div className="card-content">
                <div>
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <Link to="#">Read More</Link>
                </div>
            </div>
        </div>
    )
}

export default WorkflowCard
