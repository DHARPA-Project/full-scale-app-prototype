import React from 'react'

import './WorkflowBuilderPage.scss'

import PageWrapper from '../common/PageWrapper'
import PageHeader from '../common/PageHeader'
import ModuleBoard from '../ModuleBoard'

const WorkflowBuilderPage = () => {
    return (
        <PageWrapper>
            <div className="workflow-composition-page">
                <PageHeader>
                    <h1 className="workflow-composition-title">
                        <span>Compose your Workflow</span>
                    </h1>
                </PageHeader>

                <div className="workflow-composition-content">
                    <ModuleBoard />
                </div>
            </div>
        </PageWrapper>
    )
}

export default WorkflowBuilderPage
