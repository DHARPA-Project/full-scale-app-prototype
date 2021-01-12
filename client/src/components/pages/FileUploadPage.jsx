import React from 'react'

import './FileUploadPage.scss'

import FileUpload from '../FileUpload'
import FileList from '../FileList'
import PageWrapper from '../common/PageWrapper'

const FileUploadPage = () => {
    return (
        <PageWrapper>
            <div className="upload-page">
                <div className="upload-left">
                    <FileUpload />
                </div>

                <div className="upload-right">
                    <FileList />
                </div>
            </div>
        </PageWrapper>
    )
}

export default FileUploadPage
