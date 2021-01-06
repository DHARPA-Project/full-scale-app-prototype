import React from 'react'

import {Card, Container, Grid, Header, Segment} from 'semantic-ui-react'

import TopicModellingSteps from './TopicModellingSteps'

import {topicModellingAnalysisOptions} from '../constants/const'

const TopicModellingAnalysis = () => {
    return (
        <Container>
            <TopicModellingSteps />

            <Header size="large" textAlign="center">
                Analysis
            </Header>

            <Segment>
                <Grid columns={2} stackable textAlign="center">
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column textAlign="center">
                            <Card
                                header={topicModellingAnalysisOptions[0].title}
                                description={topicModellingAnalysisOptions[0].description}
                                href="/"
                                style={{margin: '0 auto'}}
                            />
                        </Grid.Column>

                        <Grid.Column>
                            <Card
                                header={topicModellingAnalysisOptions[1].title}
                                description={topicModellingAnalysisOptions[1].description}
                                href="/"
                                style={{margin: '0 auto'}}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column textAlign="center">
                            <Card
                                header={topicModellingAnalysisOptions[2].title}
                                description={topicModellingAnalysisOptions[2].description}
                                href="/"
                                style={{margin: '0 auto'}}
                            />
                        </Grid.Column>

                        <Grid.Column>
                            <Card
                                header={topicModellingAnalysisOptions[3].title}
                                description={topicModellingAnalysisOptions[3].description}
                                href="/"
                                style={{margin: '0 auto'}}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
    )
}

export default TopicModellingAnalysis
