import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'

import './FileBatchTable.scss'
import {Context} from '../context'

import LoadingIndicator from './common/LoadingIndicator'
import FileBatchRow from './FileBatchRow'

const FileBatchTable = () => {
    const {loggedInUser, createNotification} = useContext(Context)

    const [fileBatchesLoading, setFileBatchesLoading] = useState(false)
    const [fileBatches, setFileBatches] = useState([])

    useEffect(() => {
        const fetchFileBatches = async () => {
            setFileBatchesLoading(true)

            try {
                const response = await axios.get('/api/data', {
                    headers: {Authorization: 'Bearer ' + loggedInUser.token}
                })

                const {success, error, batches} = response.data

                if (success) {
                    setFileBatchesLoading(false)
                    setFileBatches(batches)
                } else {
                    throw new Error(error)
                }
            } catch (error) {
                setFileBatchesLoading(false)
                createNotification(
                    `This page failed to load, because required data could not be retrieved from the server. ${error}`, //message
                    'error', // type
                    0 // setting duration to 0 will make it never expire
                )
                console.error('Failed to fetch file batch data from the server:\n', error)
            }
        }

        fetchFileBatches()
    }, [createNotification, loggedInUser.token])

    if (fileBatchesLoading || !fileBatches) return <LoadingIndicator />

    return (
        <table className="file-batch-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Created</th>
                    <th>Tags</th>
                    <th>Files</th>
                    <th>Options</th>
                    <th>Output</th>
                    <th>...</th>
                </tr>
            </thead>

            <tbody>
                {fileBatches.map(batch => {
                    return (
                        <FileBatchRow
                            key={batch.id}
                            {...batch}
                            removeFileBatch={id =>
                                setFileBatches(prevFileBatches =>
                                    prevFileBatches.filter(batch => batch.id !== id)
                                )
                            }
                        />
                    )
                })}
            </tbody>
        </table>
    )
}

export default FileBatchTable
