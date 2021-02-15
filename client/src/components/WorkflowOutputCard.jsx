import React from 'react'

import './WorkflowOutputCard.scss'

import ModuleCard from './ModuleCard'

const WorkflowOutputCard = ({workflowOutput, isReady}) => {
    return (
        <div className="output-card-wrapper">
            <ModuleCard key="output" classes={`output${isReady ? ' ready' : ''}`}>
                <p>output</p>
                <p>{workflowOutput ?? workflowOutput}</p>
            </ModuleCard>
        </div>
    )
}

export default WorkflowOutputCard
