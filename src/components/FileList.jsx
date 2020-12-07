import React, {useContext, useState, useRef} from 'react'

import {Button, Checkbox, Header, Icon, Segment, Table} from 'semantic-ui-react'

import {Context} from '../context'

import {fileTypes} from '../constants/const'

import './FileList.scss'

const FileList = () => {
    const {fileUploadInProgress, uploadedFiles} = useContext(Context)

    if (!uploadedFiles || !uploadedFiles.length) {
        return (
            <Segment placeholder>
                <Header icon>
                    <Icon name="pdf file outline" />
                    No documents have been uploaded.
                </Header>
                <Button primary>Add Document</Button>
            </Segment>
        )
    }

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
                            <Button animated="vertical">
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
                        <Button icon labelPosition="left" negative size="small" floated="right">
                            <Icon name="trash alternate" /> Remove all files
                        </Button>
                        {uploadedFiles.every(file => file.fileObj.type === fileTypes.text) ? (
                            <Button icon labelPosition="left" positive size="small" floated="right">
                                <Icon name="check" /> Submit all files
                            </Button>
                        ) : (
                            <Button
                                icon
                                disabled
                                labelPosition="left"
                                positive
                                size="small"
                                floated="right"
                            >
                                <Icon name="check" /> Submit all files
                            </Button>
                        )}
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}

export default FileList
