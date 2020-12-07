import React from 'react'

import {Container} from 'semantic-ui-react'

import FileUpload from './FileUpload'
import FileList from './FileList'

import './TopicModellingPage.scss'

const TopicModelingPage = () => {
    return (
        <div className="topic-modelling-start-page">
            <Container>
                <FileUpload />
                <FileList />
            </Container>
        </div>
    )
}

export default TopicModelingPage
