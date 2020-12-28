import React, {useContext, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import {Button, Icon, Table} from 'semantic-ui-react'

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
                    <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">Size</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">Date</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">Valid</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {uploadedFiles.map(file => {
                    const isValidFile = file.fileObj.type === fileTypes.text
                    return (
                        <Table.Row key={file.id} negative={!isValidFile}>
                            <Table.Cell style={{paddingLeft: '2rem'}}>
                                {isValidFile ? (
                                    <Icon name="file outline" />
                                ) : (
                                    <Icon name="question" color="red" />
                                )}
                                &nbsp;&nbsp;
                                {file.fileObj.name}
                            </Table.Cell>
                            <Table.Cell textAlign="center">{file.fileObj.size}</Table.Cell>
                            <Table.Cell textAlign="center">{file.fileObj.lastModified}</Table.Cell>
                            <Table.Cell textAlign="center">
                                {isValidFile ? (
                                    <Icon color="green" name="checkmark" size="large" />
                                ) : (
                                    <Icon color="red" name="dont" size="large" />
                                )}
                            </Table.Cell>
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
                    )
                })}
            </Table.Body>

            <Table.Footer fullWidth>
                <Table.Row>
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
