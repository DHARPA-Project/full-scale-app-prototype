import React from 'react'

import './WorkflowOutputCard.scss'

import ModuleCard from './ModuleCard'

const WorkflowOutputCard = ({workflowOutput, isReady, isError}) => {
    return (
        <div className="output-card-wrapper">
            <ModuleCard
                key="output"
                classes={`output${isReady && !isError ? ' ready' : ''}${isError ? ' error' : ''}`}
            >
                <p>output</p>
                <p>{workflowOutput ?? workflowOutput}</p>
            </ModuleCard>
        </div>
    )
}

export default WorkflowOutputCard
