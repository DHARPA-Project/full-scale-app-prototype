import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import {FaTrashAlt} from 'react-icons/fa'
import {BsFolderSymlinkFill} from 'react-icons/bs'

import './FileBatchRow.scss'
import {Context} from '../context'

import LoadingIndicator from './common/LoadingIndicator'

const FileBatchRow = ({id, title, date, tags, files, options, removeFileBatch}) => {
    const {loggedInUser, createNotification} = useContext(Context)

    const [batchBeingDeleted, setBatchBeingDeleted] = useState(false)

    const handleBatchRemoveClick = async (id, title) => {
        if (batchBeingDeleted) return

        try {
            setBatchBeingDeleted(true)

            const response = await axios.delete(`/api/data/${id}`, {
                headers: {Authorization: 'Bearer ' + loggedInUser.token}
            })

            const {success, message, error} = response.data

            if (success) {
                setBatchBeingDeleted(false)

                createNotification(
                    message || `File batch ${title} successfully deleted`, //message
                    'success', // type
                    5000 // setting duration to 0 will make it never expire
                )

                removeFileBatch(id)
            } else {
                throw new Error(error)
            }
        } catch (error) {
            setBatchBeingDeleted(false)

            createNotification(
                `Failed to remove file batch ${title}:\n ${error}`, //message
                'error', // type
                5000 // setting duration to 0 will make it never expire
            )
            console.error(`Failed to delete file batch ${id}:\n`, error)
        }
    }

    return (
        <tr>
            <td>{title}</td>
            <td>{date.split('T')[0]}</td>
            <td>{tags}</td>
            <td>{files}</td>
            <td>{options.join(', ')}</td>
            <td>
                <Link to={`/files/${id}`} className="file-details-link">
                    <BsFolderSymlinkFill />
                </Link>
            </td>
            <td>
                {batchBeingDeleted ? (
                    <LoadingIndicator size={'33px'} />
                ) : (
                    <div
                        className="remove-file-button"
                        onClick={() => handleBatchRemoveClick(id, title)}
                    >
                        <FaTrashAlt />
                    </div>
                )}
            </td>
        </tr>
    )
}

export default FileBatchRow
