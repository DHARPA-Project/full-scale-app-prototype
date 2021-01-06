import React, {useContext, useState, useEffect} from 'react'

import {Button, Icon, Label, Segment, Table} from 'semantic-ui-react'

import {Context} from '../context'
import FileListPlaceholder from './FileListPlaceholder'
import {fileTypes} from '../constants/const'

import './FileList.scss'

const FileList = () => {
    const {
        uploadedFiles,
        setUploadedFiles,
        removeUploadedFileById,
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
        <>
            <Segment style={{display: 'flex'}}>
                <Button
                    className="remove-files"
                    icon
                    labelPosition="left"
                    size="small"
                    onClick={() => setUploadedFiles([])}
                >
                    <Icon name="trash alternate" /> Remove all files
                </Button>
                <div className="stats" style={{margin: 'auto'}}>
                    <Label color="green" horizontal>
                        <span className="stats">{numValidFiles} valid</span>
                    </Label>
                    {numValidFiles < uploadedFiles.length && (
                        <Label color="red" horizontal>
                            <span className="stats">
                                {uploadedFiles.length - numValidFiles} invalid
                            </span>
                        </Label>
                    )}
                </div>
                <Button
                    className="remove-files"
                    icon
                    labelPosition="left"
                    size="small"
                    onClick={removeAllInvalidFiles}
                >
                    <Icon name="trash alternate" /> Remove invalid files
                </Button>
            </Segment>
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
                                <Table.Cell textAlign="center">
                                    {file.fileObj.lastModified}
                                </Table.Cell>
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
            </Table>
        </>
    )
}

export default FileList
