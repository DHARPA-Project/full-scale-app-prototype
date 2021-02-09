import React from 'react'

import './WorkflowBuilderPage.scss'

import PageWrapper from '../common/PageWrapper'
import PageHeader from '../common/PageHeader'

const WorkflowBuilderPage = () => {
    return (
        <PageWrapper>
            <div className="workflow-composition-page">
                <PageHeader>
                    <h1 className="workflow-composition-page-title">
                        <span>Compose your Workflow</span>
                    </h1>
                </PageHeader>

                <div className="workflow-composition-page-content">
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias, eum
                        recusandae fugiat quam at doloremque provident facere consectetur sapiente
                        sequi!
                    </p>
                </div>
            </div>
        </PageWrapper>
    )
}

export default WorkflowBuilderPage
