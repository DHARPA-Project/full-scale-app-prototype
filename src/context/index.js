import React, {createContext, useState} from 'react'

export const Context = createContext()

const ContextProvider = props => {
    const [fileUploadInProgress, setFileUploadInProgress] = useState(false)
    const [uploadedFiles, setUploadedFiles] = useState([])

    const removeUploadedFileById = id2remove => {
        const newFileList = uploadedFiles.filter(uploadedFile => uploadedFile.id !== id2remove)
        if (newFileList.length < uploadedFiles.length) setUploadedFiles(newFileList)
    }

    return (
        <Context.Provider
            value={{
                fileUploadInProgress,
                setFileUploadInProgress,
                uploadedFiles,
                setUploadedFiles,
                removeUploadedFileById
            }}
        >
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider
