import React from 'react'

import PageWrapper from '../common/PageWrapper'
import PageHeader from '../common/PageHeader'
import FileBatchTable from '../FileBatchTable'

import './FileManagementPage.scss'

const FileManagementPage = () => {
    return (
        <PageWrapper>
            <div className="file-management-page">
                <PageHeader>
                    <h1 className="file-management-title">Manage your files</h1>
                </PageHeader>
                <div className="file-management-container">
                    <FileBatchTable />
                </div>
            </div>
        </PageWrapper>
    )
}

export default FileManagementPage
