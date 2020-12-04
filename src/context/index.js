import React, {createContext, useState} from 'react'

export const Context = createContext()

const ContextProvider = props => {
    let [fileUploadInProgress, setFileUploadInProgress] = useState(false)
    let [uploadedFiles, setUploadedFiles] = useState(null)

    return (
        <Context.Provider
            value={{
                fileUploadInProgress,
                setFileUploadInProgress,
                uploadedFiles,
                setUploadedFiles,
            }}
        >
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider
