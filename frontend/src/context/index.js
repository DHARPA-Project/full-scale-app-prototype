import React, {createContext, useState} from 'react'

import {isValidUploadedFile} from '../utils/helpers'

export const Context = createContext()

const ContextProvider = props => {
    const [fileUploadInProgress, setFileUploadInProgress] = useState(false)
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [filesReadyForSubmission, setFilesReadyForSubmission] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const removeUploadedFileById = id2remove => {
        const newFileList = uploadedFiles.filter(uploadedFile => uploadedFile.id !== id2remove)
        if (newFileList.length < uploadedFiles.length) setUploadedFiles(newFileList)
    }

    const removeAllInvalidFiles = () => {
        setUploadedFiles(uploadedFiles.filter(isValidUploadedFile))
    }

    return (
        <Context.Provider
            value={{
                fileUploadInProgress,
                setFileUploadInProgress,
                uploadedFiles,
                setUploadedFiles,
                removeUploadedFileById,
                removeAllInvalidFiles,
                filesReadyForSubmission,
                setFilesReadyForSubmission,
                showModal,
                setShowModal
            }}
        >
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider
