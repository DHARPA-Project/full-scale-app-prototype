import React, {useContext, useState, useRef} from 'react'

import {IoHelpCircleOutline} from 'react-icons/io5'
import {BiCheck} from 'react-icons/bi'

import FolderIcon from './common/icons/FolderIcon'
import DragAndDropIcon from './common/icons/DragAndDropIcon'
import Modal from './common/Modal'
import CustomButton from './common/CustomButton'

import {Context} from '../context'
import {generateId} from '../utils/helpers'

import './FileUpload.scss'

const fileUploadInstructions = () => (
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

const FileUpload = () => {
    const fileInputRef = useRef(null)

    const {
        setFileUploadInProgress,
        uploadedFiles,
        setUploadedFiles,
        filesReadyForSubmission
    } = useContext(Context) //prettier-ignore

    const [showModal, setShowModal] = useState(false)
    const [fileBatchTitle, setFileBatchTitle] = useState('')
    const [dropAreaHovered, setDropAreaHovered] = useState(false)

    const handleHover = event => {
        event.preventDefault()
        if (event.type === 'dragover') setDropAreaHovered(true)
        if (event.type === 'dragleave' || event.type === 'mouseleave') setDropAreaHovered(false)
    }

    const handleFileSelect = event => {
        event.preventDefault()
        setFileUploadInProgress(true)
        setDropAreaHovered(false)
        let inputFileObject = null
        const inputFileList = []

        try {
            // if file submitted via input
            if (event.target.files) {
                inputFileObject = event.target.files
                // if file submitted via drag-and-drop
            } else if (event.dataTransfer) {
                inputFileObject = event.dataTransfer.files
            }

            for (let i = 0; i < inputFileObject.length; i++) {
                inputFileList.push({
                    fileObj: inputFileObject[i],
                    id: generateId()
                })
            }

            if (uploadedFiles && uploadedFiles?.length) {
                const newUploadedFiles = [...uploadedFiles]
                inputFileList.forEach(newFile => {
                    // add only the newly uploaded files that have not been previously uploaded
                    if (
                        uploadedFiles.every(
                            existingFile =>
                                existingFile.fileObj.name !== newFile.fileObj.name &&
                                existingFile.fileObj.size !== newFile.fileObj.size &&
                                existingFile.fileObj.lastModified !== newFile.fileObj.lastModified
                        )
                    )
                        newUploadedFiles.push(newFile)
                })
                setUploadedFiles(newUploadedFiles)
            } else {
                setUploadedFiles(inputFileList)
            }
        } catch (error) {
            console.error('ERROR: file upload failed: ', error)
        } finally {
            setFileUploadInProgress(false)
        }
    }

    const handleFileSubmit = event => {
        event.preventDefault()
        console.log('submitting files:')
        console.log(uploadedFiles)
    }

    return (
        <div className="file-upload">
            <h1 className="file-upload-headline">
                <span>Upload Files</span>
                <IoHelpCircleOutline onClick={() => setShowModal(true)} className="icon" />
                <Modal showCross={false} isVisible={showModal} setIsVisible={setShowModal}>
                    {fileUploadInstructions()}
                </Modal>
            </h1>

            <form id="upload" onSubmit={handleFileSubmit}>
                <input
                    ref={fileInputRef}
                    className="file-upload-file-input"
                    type="file"
                    onChange={handleFileSelect}
                />

                <div
                    className={`file-upload-drop-area${dropAreaHovered ? ' hovered' : ''}`}
                    onDrop={handleFileSelect}
                    onDragOver={handleHover}
                    onDragLeave={handleHover}
                >
                    <div className="file-upload-half">
                        <CustomButton
                            onClick={event => {
                                event.preventDefault()
                                fileInputRef.current.click()
                            }}
                        >
                            <FolderIcon />
                            Browse files
                        </CustomButton>
                    </div>

                    <div className="file-upload-divider">or</div>

                    <div className="file-upload-half">
                        <DragAndDropIcon classes="file-upload-icon" />
                        <p className="instructions">Drag and drop files here</p>
                    </div>
                </div>

                <div className={`submittable${filesReadyForSubmission ? '' : ' concealed'}`}>
                    <input
                        name="title"
                        type="text"
                        placeholder="give your batch of files a title for future reference"
                        className="file-upload-text-input"
                        value={fileBatchTitle}
                        onChange={event => setFileBatchTitle(event.target.value)}
                    />

                    <input
                        name="tags"
                        type="text"
                        placeholder="list tags describing your batch of files"
                        className="file-upload-text-input"
                        value={fileBatchTitle}
                        onChange={event => setFileBatchTitle(event.target.value)}
                    />

                    <CustomButton
                        classes={`file-upload-submit-button${
                            !uploadedFiles.length ? ' hidden' : ''
                        }`}
                        type="submit"
                    >
                        <BiCheck className="icon" /> Submit all files
                    </CustomButton>
                </div>
            </form>
        </div>
    )
}

export default FileUpload
