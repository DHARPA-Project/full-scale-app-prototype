import React, {createContext, useState, useReducer, useCallback} from 'react'

import {generateId} from '../utils/helpers'
import {loadUserFromLS, saveUserToLS} from '../utils/localStorage'
import {fileTypeNames, fileTypes} from '../constants/const'

export const Context = createContext()

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'addNotification':
            return [...state, action.payload]
        case 'removeNotification':
            return state.filter(notification => notification.id !== action.payload)
        case 'removeAllNotifications':
            return []
        default:
            return state
    }
}

const ContextProvider = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState(loadUserFromLS())

    const [notifications, dispatch] = useReducer(notificationReducer, [])

    const [selectedFileType, setSelectedFileType] = useState(fileTypeNames[0])

    const [fileUploadInProgress, setFileUploadInProgress] = useState(false)
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [filesReadyForSubmission, setFilesReadyForSubmission] = useState(false)

    const saveLoggedInUser = userData => {
        saveUserToLS(userData)
        setLoggedInUser(userData)
    }

    const createNotification = useCallback(
        (message, type = 'warning', lifeSpan) =>
            dispatch({
                type: 'addNotification',
                payload: {id: generateId(), type, message, lifeSpan}
            }),
        []
    )

    const destroyNotification = id => dispatch({type: 'removeNotification', payload: id})

    const removeAllNotifications = useCallback(() => dispatch({type: 'removeAllNotifications'}), [])

    const removeUploadedFileByName = name2remove => {
        setUploadedFiles(uploadedFiles.filter(file => file.name !== name2remove))
    }

    const removeAllInvalidFiles = () => {
        setUploadedFiles(existingFiles =>
            existingFiles.filter(file => fileTypes[selectedFileType].includes(file.type))
        )
    }

    return (
        <Context.Provider
            value={{
                loggedInUser,
                saveLoggedInUser,
                notifications,
                createNotification,
                destroyNotification,
                removeAllNotifications,
                selectedFileType,
                setSelectedFileType,
                fileUploadInProgress,
                setFileUploadInProgress,
                uploadedFiles,
                setUploadedFiles,
                removeUploadedFileByName,
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
