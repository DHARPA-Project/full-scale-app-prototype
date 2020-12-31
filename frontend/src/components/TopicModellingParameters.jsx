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

    useEffect(() => {
        const fetchTextPools = async () => {
            const response = await fetch('/api/text/options')
            const {pools, operations} = await response.json()
            setTextPools(pools)
            setProcessingOperations(operations)
            setOptionsLoading(false)
        }

        fetchTextPools()
    }, [])

    const toggleProcessingOption = operationName => {
        console.log('switch toggle event: ', operationName)

        if (!selectedProcessingOptions.includes(operationName)) {
            setSelectedProcessingOptions(previousOptions => [...previousOptions, operationName])
        } else {
            setSelectedProcessingOptions(previousOptions =>
                previousOptions.filter(previousOption => previousOption !== operationName)
            )
        }
    }

    const handlePreviewClick = () => {}

    return (
        <Container>
            <TopicModellingSteps />

            <div className="text-processing-container">
                <h1 className="text-processing-heading">Prepare your text for topic modelling</h1>
                {/*
                <h2 className="text-processing-subheading">
                    Prepare your text for topic modelling
                </h2> */}

                <form className={`text-processing-options${optionsLoading ? ' empty' : ''}`}>
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
                                onClick={handlePreviewClick}
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
