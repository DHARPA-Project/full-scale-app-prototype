import React, {useContext, useState, useRef} from 'react'
import axios from 'axios'

import {IoHelpCircleOutline} from 'react-icons/io5'
import {BiCheck} from 'react-icons/bi'

import FolderIcon from './common/icons/FolderIcon'
import DragAndDropIcon from './common/icons/DragAndDropIcon'
import Modal from './common/Modal'
import CustomButton from './common/CustomButton'

import {Context} from '../context'

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
        loggedInUser,
        setFileUploadInProgress,
        uploadedFiles,
        setUploadedFiles,
        filesReadyForSubmission,
        createNotification
    } = useContext(Context) //prettier-ignore

    const [showModal, setShowModal] = useState(false)
    const [fileBatchTitle, setFileBatchTitle] = useState('')
    const [fileBatchTags, setFileBatchTags] = useState('')
    const [dropAreaHovered, setDropAreaHovered] = useState(false)

    const handleHover = event => {
        event.preventDefault()
        if (event.type === 'dragover') setDropAreaHovered(true)
        if (event.type === 'dragleave' || event.type === 'mouseleave') setDropAreaHovered(false)
    }

    const handleFileSelect = event => {
        event.preventDefault()
        setDropAreaHovered(false)
        let inputFileList

        // if file submitted via input
        if (event.target.files) {
            inputFileList = [...event.target.files]
            // if file submitted via drag-and-drop
        } else if (event.dataTransfer) {
            inputFileList = [...event.dataTransfer.files]
        }

        if (!uploadedFiles?.length) return setUploadedFiles(inputFileList)

        const newUploadedFiles = [...uploadedFiles]
        inputFileList.forEach(newFile => {
            // add only the newly uploaded files that have not been previously uploaded
            if (
                uploadedFiles.every(
                    existingFile =>
                        existingFile.name !== newFile.name &&
                        existingFile.size !== newFile.size &&
                        existingFile.lastModified !== newFile.lastModified
                )
            )
                newUploadedFiles.push(newFile)
        })
        setUploadedFiles(newUploadedFiles)
    }

    const handleFileSubmit = async event => {
        event.preventDefault()

        if (!uploadedFiles.length) {
            return createNotification(
                `Please upload files before submitting!`, //message
                'error', // type
                10000 // setting duration to 0 will make it never expire
            )
        }

        setFileUploadInProgress(true)
        const formData = new FormData()

        formData.append('title', fileBatchTitle)
        formData.append('tags', fileBatchTags)

        for (let i = 0; i < uploadedFiles.length; i++) {
            formData.append('file', uploadedFiles[i])
        }

        try {
            const response = await axios.post(
                '/api/data',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + loggedInUser.token
                    }
                },
                {
                    onUploadProgress: progressEvent =>
                        console.log('percent loaded: ', 100 * progressEvent.loaded / progressEvent.total) // prettier-ignore
                }
            )

            if (response?.data?.success && response?.data?.message) {
                setUploadedFiles([])
                setFileBatchTitle('')
                setFileBatchTags('')
                console.log('File(s) successfully uploaded: ', response)
                createNotification(
                    response?.data?.message || `Upload successful.`, //message
                    'success', // type
                    10000 // setting duration to 0 will make it never expire
                )
            }
        } catch (error) {
            console.error(`File upload failed: ${error}`)
            createNotification(
                `File upload failed: ${error}`, //message
                'error', // type
                10000 // setting duration to 0 will make it never expire
            )
        } finally {
            setFileUploadInProgress(false)
        }
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

            <form
                id="upload"
                action="/api/data"
                method="post"
                encType="multipart/form-data"
                onSubmit={handleFileSubmit}
            >
                <input
                    ref={fileInputRef}
                    className="file-upload-file-input"
                    name="file"
                    type="file"
                    multiple
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
                        value={fileBatchTags}
                        onChange={event => setFileBatchTags(event.target.value)}
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
