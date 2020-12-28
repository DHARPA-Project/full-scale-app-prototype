import React, {useContext, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import {Button, Checkbox, Icon, Table} from 'semantic-ui-react'

import {Context} from '../context'
import FileListPlaceholder from './FileListPlaceholder'
import {fileTypes} from '../constants/const'

import './FileList.scss'

const FileList = () => {
    const history = useHistory()

    const {uploadedFiles, setUploadedFiles, removeUploadedFileById} = useContext(Context)

    const [numValidFiles, setNumValidFiles] = useState(0)
    const [filesReadyForSubmission, setFilesReadyForSubmission] = useState(false)

    useEffect(() => {
        const validFiles = uploadedFiles.filter(file => file.fileObj.type === fileTypes.text).length
        setNumValidFiles(validFiles)
        setFilesReadyForSubmission(validFiles === uploadedFiles.length)
    }, [uploadedFiles])

    if (!uploadedFiles || !uploadedFiles.length) return <FileListPlaceholder />

    return (
        <Table celled compact definition>
            <Table.Header fullWidth>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Size</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {uploadedFiles.map(file => (
                    <Table.Row key={file.id}>
                        <Table.Cell collapsing>
                            <Checkbox slider />
                        </Table.Cell>
                        <Table.Cell>{file.fileObj.name}</Table.Cell>
                        <Table.Cell>{file.fileObj.size}</Table.Cell>
                        <Table.Cell>{file.fileObj.lastModified}</Table.Cell>
                        {file.fileObj.type === fileTypes.text ? (
                            <Table.Cell positive>{file.fileObj.type}</Table.Cell>
                        ) : (
                            <Table.Cell negative>{file.fileObj.type}</Table.Cell>
                        )}
                        <Table.Cell collapsing>
                            <Button
                                animated="vertical"
                                onClick={() => removeUploadedFileById(file.id)}
                            >
                                <Button.Content hidden>Remove</Button.Content>
                                <Button.Content visible>
                                    <Icon name="trash alternate" />
                                </Button.Content>
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>

            <Table.Footer fullWidth>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell colSpan="5">
                        <span className="stats">
                            <span>files: </span>
                            <span>{numValidFiles} valid</span>
                            <span> / {uploadedFiles.length} total</span>
                        </span>
                        <Button
                            icon
                            labelPosition="left"
                            negative
                            size="small"
                            floated="right"
                            onClick={() => setUploadedFiles([])}
                        >
                            <Icon name="trash alternate" /> Remove all files
                        </Button>
                        <Button
                            icon
                            labelPosition="left"
                            positive={filesReadyForSubmission ? true : false}
                            size="small"
                            floated="right"
                            disabled={filesReadyForSubmission ? false : true}
                            onClick={() => history.push('/topic-modelling/parameters')}
                        >
                            <Icon name="check" /> Submit all files
                        </Button>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}

export default FileList
