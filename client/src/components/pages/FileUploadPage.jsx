import React, {useContext} from 'react'

import './FileUploadPage.scss'
import {Context} from '../../context'

import FileUpload from '../FileUpload'
import FileList from '../FileList'
import PageWrapper from '../common/PageWrapper'
import Spinner from '../common/Spinner'

const FileUploadPage = () => {
    const {uploadedFiles, filesReadyForSubmission, fileUploadInProgress} = useContext(Context) //prettier-ignore

    return (
        <PageWrapper>
            <div
                className={`upload-page${
                    !uploadedFiles.length
                        ? ' step-upload'
                        : !filesReadyForSubmission
                        ? ' step-validation'
                        : ' step-submission'
                }`}
            >
                <div className="upload-left">
                    <FileUpload />
                </div>

                <div className="upload-right">
                    {fileUploadInProgress ? <Spinner /> : <FileList />}
                </div>
            </div>
        </PageWrapper>
    )
}

export default FileUploadPage
