import React, {useEffect, useState} from 'react'

import {Container} from 'semantic-ui-react'

import './TopicModellingParameters.scss'

import TopicModellingSteps from './TopicModellingSteps'
import Spinner from './common/Spinner'
import CustomButton from './common/CustomButton'
import TextPoolSelect from './TextPoolSelect'
import TextProcessingTable from './TextProcessingTable'
import TextProcessingOutput from './TextProcessingOutput'

const TopicModellingParameters = () => {
    const [optionsLoading, setOptionsLoading] = useState(true)
    const [textPools, setTextPools] = useState([])
    const [processingOperations, setProcessingOperations] = useState([])
    const [selectedTextPool, setSelectedTextPool] = useState(null)
    const [selectedProcessingOptions, setSelectedProcessingOptions] = useState([])
    const [previewLoading, setPreviewLoading] = useState(false)
    const [originalText, setOriginalText] = useState('')
    const [processedText, setProcessedText] = useState('')

    useEffect(() => {
        const fetchTextPools = async () => {
            const response = await fetch('/api/text/options')
            const {success, error, pools, operations} = await response.json()
            if (success) {
                setTextPools(pools)
                setProcessingOperations(operations)
            } else {
                throw new Error(error)
            }
        }

        try {
            fetchTextPools()
        } catch (error) {
            console.error('Failed to fetch text-pool & options data from the server:\n', error)
        } finally {
            setOptionsLoading(false)
        }
    }, [])

    useEffect(() => {
        if (originalText.length && processedText.length) {
            // TO DO: generate preview
        }
    }, [originalText, processedText])

    const toggleProcessingOption = operationName => {
        if (!selectedProcessingOptions.includes(operationName)) {
            setSelectedProcessingOptions(previousOptions => [...previousOptions, operationName])
        } else {
            setSelectedProcessingOptions(previousOptions =>
                previousOptions.filter(previousOption => previousOption !== operationName)
            )
        }
    }

    const handlePreviewRequest = async event => {
        event.preventDefault()

        setPreviewLoading(true)

        const url = `/api/text/processing?id=${selectedTextPool}&operations=${selectedProcessingOptions.join('&operations=')}` //prettier-ignore

        try {
            const response = await fetch(url)
            const {success, error, original, processed} = await response.json()
            if (success) {
                setOriginalText(original)
                setProcessedText(processed)
            } else {
                throw new Error(error)
            }
        } catch (error) {
            console.error('Failed to get text processing preview from the server', error)
        } finally {
            setPreviewLoading(false)
        }
    }

    return (
        <Container>
            <TopicModellingSteps />

            <div className="text-processing-container">
                <h1 className="text-processing-heading">Prepare your text for topic modelling</h1>

                <form
                    className={`text-processing-options${optionsLoading ? ' empty' : ''}`}
                    onSubmit={handlePreviewRequest}
                >
                    {optionsLoading ? (
                        <Spinner />
                    ) : (
                        <>
                            <TextPoolSelect
                                textPools={textPools}
                                selectedTextPool={selectedTextPool}
                                setSelectedTextPool={setSelectedTextPool}
                            />

                            <TextProcessingTable
                                operations={processingOperations}
                                toggleProcessingOption={toggleProcessingOption}
                                selectedOptions={selectedProcessingOptions}
                            />

                            <CustomButton
                                style={{margin: '2rem auto 1rem'}}
                                disabled={selectedProcessingOptions.length > 0 ? false : true}
                            >
                                {selectedProcessingOptions.length > 0
                                    ? `Let's see what we've got so far!`
                                    : 'Required options not selected'}
                            </CustomButton>
                        </>
                    )}
                </form>

                <TextProcessingOutput />
            </div>
        </Container>
    )
}

export default TopicModellingParameters