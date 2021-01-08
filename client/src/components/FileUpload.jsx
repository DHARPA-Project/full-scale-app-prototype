import React, {useContext, useState, useRef} from 'react'

import {Button, Divider, Grid, Header, Icon, Label, Segment} from 'semantic-ui-react'

import FolderIcon from './common/icons/FolderIcon'
import DragAndDropIcon from './common/icons/DragAndDropIcon'

import {Context} from '../context'
import {generateId} from '../utils/helpers'

import './FileUpload.scss'

const FileUpload = () => {
    const fileInputRef = useRef(null)

    const {
        setFileUploadInProgress,
        uploadedFiles,
        setUploadedFiles,
        setShowModal
    } = useContext(Context) //prettier-ignore

    const [fileUploadAreaCollapsed, setFileUploadAreaCollapsed] = useState(false)
    const [dropAreaHovered, setDropAreaHovered] = useState(false)

    const toggleFileUploadCollapse = () => setFileUploadAreaCollapsed(!fileUploadAreaCollapsed)

    const handleHover = event => {
        event.preventDefault()
        if (event.type === 'dragover') setDropAreaHovered(true)
        if (event.type === 'dragleave') setDropAreaHovered(false)
        if (event.type === 'mouseleave') setDropAreaHovered(false)
    }

    const handleFileSelect = event => {
        event.preventDefault()
        setFileUploadInProgress(true)
        setDropAreaHovered(false)
        let inputFileObject = null
        const inputFileList = []

        try {
            // if file submitted via input
            if (event.target.files) {
                inputFileObject = event.target.files
                // if file submitted via drag-and-drop
            } else if (event.dataTransfer) {
                inputFileObject = event.dataTransfer.files
            }

            for (let i = 0; i < inputFileObject.length; i++) {
                inputFileList.push({
                    fileObj: inputFileObject[i],
                    id: generateId()
                })
            }

            if (uploadedFiles && uploadedFiles?.length) {
                const newUploadedFiles = [...uploadedFiles]
                inputFileList.forEach(newFile => {
                    // add only the newly uploaded files that have not been previously uploaded
                    if (
                        uploadedFiles.every(
                            existingFile =>
                                existingFile.fileObj.name !== newFile.fileObj.name &&
                                existingFile.fileObj.size !== newFile.fileObj.size &&
                                existingFile.fileObj.lastModified !== newFile.fileObj.lastModified
                        )
                    )
                        newUploadedFiles.push(newFile)
                })
                setUploadedFiles(newUploadedFiles)
            } else {
                setUploadedFiles(inputFileList)
            }
        } catch (error) {
            console.error('ERROR: file upload failed: ', error)
        } finally {
            setFileUploadInProgress(false)
        }
    }

    return (
        <React.Fragment>
            <Header size="huge" attached="top" textAlign="center" style={{position: 'relative'}}>
                <div>
                    <Icon
                        name={`caret ${fileUploadAreaCollapsed ? 'right' : 'down'}`}
                        size="large"
                        onClick={toggleFileUploadCollapse}
                        className="collapse-icon"
                    />
                    <Header.Content>Upload text files for topic modelling</Header.Content>
                </div>
                <Label
                    color="grey"
                    floating
                    className="help-tag"
                    onClick={() => setShowModal(true)}
                >
                    ?
                </Label>
            </Header>
            <Segment placeholder attached className={fileUploadAreaCollapsed ? 'collapsed' : ''}>
                <form action="#" method="get" className="file-upload" id="upload">
                    <input
                        ref={fileInputRef}
                        className="file-upload-input"
                        type="file"
                        onChange={handleFileSelect}
                    />

                    <Grid columns={2} stackable textAlign="center">
                        <Divider vertical>Or</Divider>

                        <Grid.Row verticalAlign="middle">
                            <Grid.Column className="file-upload-browse-area">
                                <FolderIcon />
                                <p className="instructions">Find files by browsing</p>
                                <Button
                                    onClick={event => {
                                        event.preventDefault()
                                        fileInputRef.current.click()
                                    }}
                                >
                                    Browse
                                </Button>
                            </Grid.Column>

                            <Grid.Column>
                                <div
                                    className={`file-upload-drop-area${
                                        dropAreaHovered ? ' hovered' : ''
                                    }`}
                                    onDrop={handleFileSelect}
                                    onDragOver={handleHover}
                                    onDragLeave={handleHover}
                                >
                                    <DragAndDropIcon />
                                    <p className="instructions">Drag and drop files here</p>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </form>
            </Segment>
        </React.Fragment>
    )
}

export default FileUpload
