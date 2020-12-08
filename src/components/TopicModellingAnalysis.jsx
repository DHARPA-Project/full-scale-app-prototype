import React from 'react'

import {Header, Container} from 'semantic-ui-react'

import TopicModellingSteps from './TopicModellingSteps'

const TopicModellingAnalysis = () => {
    return (
        <Container>
            <TopicModellingSteps />
            <Header size="large" textAlign="center">
                Analysis
            </Header>
        </Container>
    )
}

export default TopicModellingAnalysis
