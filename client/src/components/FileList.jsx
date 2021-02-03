import React, {useContext, useState, useEffect} from 'react'

import {FaTrashAlt} from 'react-icons/fa'

import CustomButton from './common/CustomButton'

import './FileList.scss'
import {Context} from '../context'
import {fileTypes} from '../constants/const'
import FileTable from './FileTable'

const FileList = () => {
    const {
        selectedFileType,
        uploadedFiles,
        setUploadedFiles,
        removeAllInvalidFiles,
        setFilesReadyForSubmission
    } = useContext(Context)

    const [numValidFiles, setNumValidFiles] = useState(0)

    useEffect(() => {
        // typeof fileTypes[selectedFileType] === string || array
        const validFiles = uploadedFiles.filter(file =>
            fileTypes[selectedFileType].includes(file.type)
        ).length
        setNumValidFiles(validFiles)
        setFilesReadyForSubmission(uploadedFiles.length > 0 && uploadedFiles.length === validFiles)
    }, [selectedFileType, uploadedFiles, setFilesReadyForSubmission])

    if (!uploadedFiles?.length) return null

    return (
        <div className="file-list">
            <FileTable />

            <div className="file-list-control-options">
                <CustomButton onClick={() => setUploadedFiles([])}>
                    <FaTrashAlt />
                    &nbsp;&nbsp;Remove all files
                </CustomButton>

                <div className="stats">
                    <div className="stats-bubble valid">{numValidFiles} valid</div>
                    {numValidFiles < uploadedFiles.length && (
                        <span className="stats-bubble invalid">
                            {uploadedFiles.length - numValidFiles} invalid
                        </span>
                    )}
                </div>
                <CustomButton onClick={removeAllInvalidFiles}>
                    <FaTrashAlt />
                    &nbsp;&nbsp;Remove invalid files
                </CustomButton>
            </div>
        </div>
    )
}

export default FileList
