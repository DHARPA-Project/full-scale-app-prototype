import React from 'react'

// import {Header, Table, Checkbox, Button, Container} from 'semantic-ui-react'
import {
    Segment,
    Button,
    Header,
    Divider,
    Dimmer,
    Loader,
    Icon,
    Message,
    Input,
    Container,
    Grid,
    Checkbox,
    Sidebar,
    Menu,
    Table
} from 'semantic-ui-react'

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
