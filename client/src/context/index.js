import React, {createContext, useState, useReducer} from 'react'
import {v4 as uuidv4} from 'uuid'

import {isValidUploadedFile} from '../utils/helpers'
import {loadUserFromLS, saveUserToLS} from '../utils/localStorage'

export const Context = createContext()

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'addNotification':
            return [...state, action.payload]
        case 'removeNotification':
            return state.filter(notification => notification.id !== action.payload)
        default:
            return state
    }
}

const ContextProvider = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState(loadUserFromLS())

    const [notifications, dispatch] = useReducer(notificationReducer, [])

    const [fileUploadInProgress, setFileUploadInProgress] = useState(false)
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [filesReadyForSubmission, setFilesReadyForSubmission] = useState(false)

    const saveLoggedInUser = userData => {
        saveUserToLS(userData)
        setLoggedInUser(userData)
    }

    const createNotification = (message, type = 'warning', lifeSpan) =>
        dispatch({
            type: 'addNotification',
            payload: {id: uuidv4(), type, message, lifeSpan}
        })

    const destroyNotification = id => dispatch({type: 'removeNotification', payload: id})

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
                loggedInUser,
                saveLoggedInUser,
                notifications,
                createNotification,
                destroyNotification,
                fileUploadInProgress,
                setFileUploadInProgress,
                uploadedFiles,
                setUploadedFiles,
                removeUploadedFileById,
                removeAllInvalidFiles,
                filesReadyForSubmission,
                setFilesReadyForSubmission
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default ContextProvider
