import React, {useContext, useState, useEffect} from 'react'

import {FaTrashAlt} from 'react-icons/fa'

import FileListPlaceholder from './FileListPlaceholder'
import CustomButton from './common/CustomButton'

import './FileList.scss'
import {Context} from '../context'
import {fileTypes} from '../constants/const'
import FileTable from './FileTable'

const FileList = () => {
    const {
        uploadedFiles,
        setUploadedFiles,
        removeAllInvalidFiles,
        setFilesReadyForSubmission
    } = useContext(Context)

    const [numValidFiles, setNumValidFiles] = useState(0)

    useEffect(() => {
        const validFiles = uploadedFiles.filter(file => file.fileObj.type === fileTypes.text).length
        setNumValidFiles(validFiles)
        setFilesReadyForSubmission(uploadedFiles.length > 0 && uploadedFiles.length === validFiles)
    }, [uploadedFiles, setFilesReadyForSubmission])

    if (!uploadedFiles || !uploadedFiles.length) return <FileListPlaceholder />

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
