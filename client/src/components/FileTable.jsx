import React, {useContext} from 'react'

import {ImCheckmark} from 'react-icons/im'
import {ImCross} from 'react-icons/im'
import {FaTrashAlt} from 'react-icons/fa'

import './FileTable.scss'
import {Context} from '../context'
import {fileTypes} from '../constants/const'

const FileTable = () => {
    const {uploadedFiles, removeUploadedFileById} = useContext(Context)

    return (
        <table className="file-list-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Date</th>
                    <th>Valid</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {uploadedFiles.map(file => {
                    const isValidFile = file.fileObj.type === fileTypes.text
                    return (
                        <tr key={file.id}>
                            <td>
                                <span className={`file-name${isValidFile ? '' : ' invalid'}`}>
                                    {file.fileObj.name}
                                </span>
                            </td>
                            <td>{file.fileObj.size}</td>
                            <td>{file.fileObj.lastModified}</td>
                            <td>
                                {isValidFile ? (
                                    <ImCheckmark className="icon" />
                                ) : (
                                    <ImCross className="icon" />
                                )}
                            </td>
                            <td>
                                <div
                                    className="remove-file-button"
                                    onClick={() => removeUploadedFileById(file.id)}
                                >
                                    <FaTrashAlt />
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default FileTable
