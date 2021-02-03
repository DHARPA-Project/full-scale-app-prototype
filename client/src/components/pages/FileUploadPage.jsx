import React, {useContext, useState} from 'react'

import {IoHelpCircleOutline} from 'react-icons/io5'

import './FileUploadPage.scss'
import {Context} from '../../context'

import FileUpload from '../FileUpload'
import FileList from '../FileList'
import PageWrapper from '../common/PageWrapper'
import Spinner from '../common/Spinner'
import PageHeader from '../common/PageHeader'
import Modal from '../common/Modal'
import FileTypeOptions from '../FileTypeOptions'

const FileUploadInstructions = () => (
    <>
        <h1>File Upload Instructions</h1>
        <ul>
            <li>Only *.txt files can be submitted for topic modelling analysis</li>
            <li>The file names must contain a time stamp of the following format: *#%@*</li>
            <li>
                The file names or content may not include discrediting information about Italy or
                Italians (for your own sake)
            </li>
        </ul>
    </>
)

const FileUploadPage = () => {
    const {uploadedFiles, filesReadyForSubmission, fileUploadInProgress} = useContext(Context) //prettier-ignore

    const [showModal, setShowModal] = useState(false)

    return (
        <PageWrapper>
            <div className={`upload-page`}>
                <PageHeader>
                    <h1 className="upload-page-title">
                        <span>Upload Files</span>
                        <IoHelpCircleOutline onClick={() => setShowModal(true)} className="icon" />
                        <Modal showCross={false} isVisible={showModal} setIsVisible={setShowModal}>
                            <FileUploadInstructions />
                        </Modal>
                    </h1>
                    <FileTypeOptions />
                </PageHeader>

                <div
                    className={`upload-page-content${
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
            </div>
        </PageWrapper>
    )
}

export default FileUploadPage
