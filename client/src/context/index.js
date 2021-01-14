import React, {createContext, useState, useReducer} from 'react'

import {generateId, isValidUploadedFile} from '../utils/helpers'
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
            payload: {id: generateId(), type, message, lifeSpan}
        })

    const destroyNotification = id => dispatch({type: 'removeNotification', payload: id})

    const removeUploadedFileByName = name2remove => {
        setUploadedFiles(uploadedFiles.filter(file => file.name !== name2remove))
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
