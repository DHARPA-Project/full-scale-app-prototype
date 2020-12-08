import React from 'react'
import {useHistory} from 'react-router-dom'

import {Header, Table, Checkbox, Button, Container} from 'semantic-ui-react'

import TopicModellingSteps from './TopicModellingSteps'

const TopicModellingParameters = () => {
    const history = useHistory()

    return (
        <Container>
            <TopicModellingSteps />
            <Header size="large" textAlign="center">
                Topic modelling
            </Header>

            <Table celled compact definition>
                <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell>Process</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell collapsing>
                            <Checkbox toggle defaultChecked />
                        </Table.Cell>
                        <Table.Cell>Pre-processing</Table.Cell>
                        <Table.Cell>
                            Tokenization, lowercasing, stemming, removing stop words and words less
                            than a number of characters, noise removal.
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell collapsing>
                            <Checkbox toggle />
                        </Table.Cell>
                        <Table.Cell>Display LDA options</Table.Cell>
                        <Table.Cell>
                            Add TFIDF and bigrams functionalities to compare outputs. If this option
                            is not activated, the model will be computed with Gensim LDA.
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell collapsing>
                            <Checkbox toggle defaultChecked />
                        </Table.Cell>
                        <Table.Cell>Selecting the number of topics</Table.Cell>
                        <Table.Cell>
                            See how the model differs depending on the number of topics and decide
                            the number of topics you wish to run the model on. Optional coherence
                            metrics provided.
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell collapsing>
                            <Checkbox toggle defaultChecked />
                        </Table.Cell>
                        <Table.Cell>Topics naming</Table.Cell>
                        <Table.Cell>
                            Perform an in-depth analysis of the topics through an exploratory
                            visualization displaying saliency and relevance metrics to help you
                            naming the topics.
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell collapsing>
                            <Checkbox toggle />
                        </Table.Cell>
                        <Table.Cell>Statistics</Table.Cell>
                        <Table.Cell>
                            Display statistics related to topic distribution and historicization.
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell colSpan="2">
                            <Button
                                floated="right"
                                icon
                                labelPosition="left"
                                primary
                                size="small"
                                onClick={() => history.push('/topic-modelling/analysis')}
                            >
                                Submit
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Container>
    )
}

export default TopicModellingParameters
