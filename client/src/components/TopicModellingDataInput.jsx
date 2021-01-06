import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {Button, Container, Icon} from 'semantic-ui-react'

import TopicModellingSteps from './TopicModellingSteps'
import FileUpload from './FileUpload'
import FileList from './FileList'
import Modal from './common/Modal'

import {Context} from '../context'

const DataInput = () => {
    const {uploadedFiles, filesReadyForSubmission, showModal, setShowModal} = useContext(Context)

    const history = useHistory()

    const handleFileSubmit = () => history.push('/topic-modelling/parameters')

    return (
        <Container>
            <TopicModellingSteps />
            <FileUpload />
            <FileList />
            {uploadedFiles.length > 0 && (
                <div style={{display: 'flex', justifyContent: 'center', padding: '1rem'}}>
                    <Button
                        icon
                        labelPosition="left"
                        positive={filesReadyForSubmission ? true : false}
                        size="small"
                        floated="right"
                        disabled={filesReadyForSubmission ? false : true}
                        onClick={handleFileSubmit}
                    >
                        <Icon name="check" /> Submit all files
                    </Button>
                </div>
            )}
            <Modal showCross={false} isVisible={showModal} setIsVisible={setShowModal}>
                <h1>File Upload Instructions</h1>
                <ul>
                    <li>Only *.txt files can be submitted for topic modelling analysis</li>
                    <li>The file names must contain a time stamp of the following format: *#%@*</li>
                    <li>
                        The file names or content may not include discrediting information about
                        Italy or Italians (for your own sake)
                    </li>
                </ul>
            </Modal>
        </Container>
    )
}

export default DataInput
