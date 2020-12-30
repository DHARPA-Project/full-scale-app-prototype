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

    const toggleProcessingOption = option => {
        if (!selectedProcessingOptions.includes(option)) {
            setSelectedProcessingOptions(previousOptions => [...previousOptions, option])
        } else {
            setSelectedProcessingOptions(previousOptions =>
                previousOptions.filter(previousOption => previousOptions !== option)
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
                            <TextPoolSelect textPools={textPools} />

                            <TextProcessingTable
                                operations={processingOperations}
                                toggleProcessingOption={toggleProcessingOption}
                            />

                            <CustomButton
                                onClick={handlePreviewClick}
                                style={{margin: '2rem auto 1rem'}}
                                disabled={selectedProcessingOptions.length > 0 ? false : true}
                            >
                                {selectedProcessingOptions.length > 0
                                    ? `Let's see what we've got so far!`
                                    : 'No processing operations selected'}
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
