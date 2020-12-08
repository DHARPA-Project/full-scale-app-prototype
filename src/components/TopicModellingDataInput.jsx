import React from 'react'

import {Container} from 'semantic-ui-react'

import TopicModellingSteps from './TopicModellingSteps'
import FileUpload from './FileUpload'
import FileList from './FileList'

const DataInput = () => {
    return (
        <Container>
            <TopicModellingSteps />
            <FileUpload />
            <FileList />
        </Container>
    )
}

export default DataInput
