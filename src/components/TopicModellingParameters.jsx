import React from 'react'
import {useHistory} from 'react-router-dom'

import {Button, Checkbox, Container, Form, Grid, Header, Table, TextArea} from 'semantic-ui-react'

import TopicModellingSteps from './TopicModellingSteps'

import {topicModellingOperations, textPreviewPlaceholder} from '../constants/const'

const TopicModellingParameters = () => {
    const history = useHistory()

    const handlePreviewClick = () => {}

    return (
        <Container>
            <TopicModellingSteps />
            <Header size="large" textAlign="center">
                Topic modelling
            </Header>

            <Grid columns={2} stackable textAlign="center">
                <Grid.Row verticalAlign="middle">
                    <Grid.Column className="file-upload-browse-area">
                        <Table celled compact definition collapsing>
                            <Table.Header fullWidth>
                                <Table.Row>
                                    <Table.HeaderCell />
                                    <Table.HeaderCell>Text Pre-processing</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {topicModellingOperations.map((operation, index) => (
                                    <Table.Row key={index}>
                                        <Table.Cell collapsing>
                                            <Checkbox
                                                toggle
                                                defaultChecked={operation.enabled}
                                                disabled={operation.mandatory}
                                            />
                                        </Table.Cell>
                                        <Table.Cell>{operation.name}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>

                            <Table.Footer fullWidth>
                                <Table.Row>
                                    <Table.HeaderCell />
                                    <Table.HeaderCell colSpan="2" textAlign="center">
                                        <Button
                                            icon
                                            primary
                                            size="small"
                                            onClick={handlePreviewClick}
                                        >
                                            Preview
                                        </Button>
                                        <Button
                                            icon
                                            positive
                                            size="small"
                                            onClick={() =>
                                                history.push('/topic-modelling/analysis')
                                            }
                                        >
                                            Submit
                                        </Button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </Grid.Column>

                    <Grid.Column style={{height: '100%'}}>
                        <textarea
                            placeholder={textPreviewPlaceholder}
                            rows="32"
                            style={{display: 'block', heigth: 'auto', width: '100%'}}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default TopicModellingParameters
