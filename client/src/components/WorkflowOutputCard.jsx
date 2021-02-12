import React from 'react'

import './WorkflowOutputCard.scss'

import ModuleCard from './ModuleCard'

const WorkflowOutputCard = ({workflowOutput, isReady}) => {
    return (
        <ModuleCard key="output" classes="output">
            <p>output</p>
            <p>{isReady ? 'no operations selected!' : workflowOutput ?? workflowOutput}</p>
        </ModuleCard>
    )
}

export default WorkflowOutputCard
