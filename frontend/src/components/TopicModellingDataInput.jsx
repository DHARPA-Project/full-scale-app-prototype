import React, {useContext} from 'react'

import {Container} from 'semantic-ui-react'

import TopicModellingSteps from './TopicModellingSteps'
import FileUpload from './FileUpload'
import FileList from './FileList'
import Modal from './common/Modal'

import {Context} from '../context'

const DataInput = () => {
    const {showModal, setShowModal} = useContext(Context)

    return (
        <Container>
            <TopicModellingSteps />
            <FileUpload />
            <FileList />
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
