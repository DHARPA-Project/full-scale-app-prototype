import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'

import {FaTrashAlt} from 'react-icons/fa'

import './FileBatchTable.scss'
import {Context} from '../context'

import Spinner from './common/Spinner'
import {Link} from 'react-router-dom'

const FileBatchTable = () => {
    const {loggedInUser, createNotification} = useContext(Context)

    const [fileBatchLoading, setFileBatchLoading] = useState(false)
    const [fileBatches, setFileBatches] = useState([])

    useEffect(() => {
        const fetchFileBatches = async () => {
            setFileBatchLoading(true)
            try {
                const response = await axios.get('/api/data', {
                    headers: {Authorization: 'Bearer ' + loggedInUser.token}
                })

                const {success, error, batches} = response.data

                if (success) {
                    setFileBatches(batches)
                } else {
                    throw new Error(error)
                }
            } catch (error) {
                createNotification(
                    `This page failed to load, because required data could not be retrieved from the server. ${error}`, //message
                    'error', // type
                    0 // setting duration to 0 will make it never expire
                )
                console.error('Failed to fetch file batch data from the server:\n', error)
            } finally {
                setFileBatchLoading(false)
            }
        }

        fetchFileBatches()

        // eslint-disable-next-line
    }, [])

    if (fileBatchLoading || !fileBatches) return <Spinner />

    return (
        <table className="file-batch-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Created</th>
                    <th>Tags</th>
                    <th>Files</th>
                    <th>Settings</th>
                    <th>Output</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {fileBatches.map(batch => {
                    const {id, title, date, tags, files, options} = batch
                    return (
                        <tr key={id}>
                            <td>{title}</td>
                            <td>{date.split('T')[0]}</td>
                            <td>{tags}</td>
                            <td>{files}</td>
                            <td>{options}</td>
                            <td>
                                <Link to={`/output/${id}`}>see output</Link>
                            </td>
                            <td>
                                <div
                                    className="remove-file-button"
                                    onClick={() => console.log('removing file batch with ID ', id)}
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

export default FileBatchTable
