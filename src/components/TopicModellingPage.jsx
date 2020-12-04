import React from 'react'

import {Container} from 'semantic-ui-react'

import FileUpload from './FileUpload'

import './TopicModellingPage.scss'

const TopicModelingPage = () => {
    return (
        <div className="topic-modelling-start-page">
            <Container>
                <FileUpload />
            </Container>
        </div>
    )
}

export default TopicModelingPage
