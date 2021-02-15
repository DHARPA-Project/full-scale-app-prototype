import React from 'react'

import './WorkflowBuilderPage.scss'

import PageWrapper from '../common/PageWrapper'
import ModuleBoard from '../ModuleBoard'

const WorkflowBuilderPage = () => {
    return (
        <PageWrapper>
            <div className="workflow-composition-page">
                <div className="workflow-composition-content">
                    <ModuleBoard />
                </div>
            </div>
        </PageWrapper>
    )
}

export default WorkflowBuilderPage
