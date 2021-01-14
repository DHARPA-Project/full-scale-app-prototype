import React from 'react'

import PageWrapper from '../common/PageWrapper'
import FileBatchTable from '../FileBatchTable'

import './FileManagementPage.scss'

const FileManagementPage = () => {
    return (
        <PageWrapper>
            <div className="file-management-page">
                <h1 className="file-management-heading">Manage your files</h1>
                <div className="file-management-container">
                    <FileBatchTable />
                </div>
            </div>
        </PageWrapper>
    )
}

export default FileManagementPage
