import React from 'react'

import {Divider, Grid, Segment, Card, Container} from 'semantic-ui-react'

const HomePage = () => {
    return (
        <Container>
            <Segment>
                <Grid columns={2} stackable textAlign="center">
                    <Divider vertical>Or</Divider>

                    <Grid.Row verticalAlign="middle">
                        <Grid.Column textAlign="center">
                            <Card
                                header="Topic Modelling"
                                meta="NLP"
                                description="Using statistical modelling to discover topics in a textual collection."
                                href="/topic-modelling"
                                style={{margin: '0 auto'}}
                            />
                        </Grid.Column>

                        <Grid.Column>
                            <Card
                                header="Geolocation"
                                meta="geolocation"
                                description="Methods of geolocation which can be implemented iteratively to produce standardized coordinate data"
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

export default HomePage
