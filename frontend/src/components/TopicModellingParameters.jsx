import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'

import {Container} from 'semantic-ui-react'
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'

import {Diff} from 'diff'

import './TopicModellingParameters.scss'

import Spinner from './common/Spinner'
import CustomButton from './common/CustomButton'
import Modal from './common/Modal'
import TopicModellingSteps from './TopicModellingSteps'
import TextPoolSelect from './TextPoolSelect'
import TextProcessingTable from './TextProcessingTable'
import TextProcessingOutput from './TextProcessingOutput'

import {Context} from '../context'

const TopicModellingParameters = () => {
    const {createNotification} = useContext(Context)
    const history = useHistory()

    const [optionsLoading, setOptionsLoading] = useState(true)
    const [textPools, setTextPools] = useState([])
    const [processingOperations, setProcessingOperations] = useState([])

    const [selectedTextPool, setSelectedTextPool] = useState(null)
    const [selectedProcessingOptions, setSelectedProcessingOptions] = useState([])
    const [previewLoading, setPreviewLoading] = useState(false)
    const [preview, setPreview] = useState('')
    const [showSubmitPrompt, setShowSubmitPrompt] = useState(false)

    useEffect(() => {
        const fetchTextPools = async () => {
            try {
                const response = await fetch('/api/text/options/')
                const {success, error, pools, operations} = await response.json()
                if (success) {
                    setTextPools(pools)
                    setProcessingOperations(operations)
                } else {
                    throw new Error(error)
                }
            } catch (error) {
                createNotification(
                    `This page failed to load, because required data could not be retrieved from the server. ${error}`, //message
                    'error', // type
                    0 // setting duration to 0 will make it never expire
                )
                console.error('Failed to fetch text-pool & options data from the server:\n', error)
            } finally {
                setOptionsLoading(false)
            }
        }

        fetchTextPools()
    }, [])

    const toggleProcessingOption = operationName => {
        setPreview('')

        if (selectedProcessingOptions.includes(operationName)) {
            setSelectedProcessingOptions(previousOptions =>
                previousOptions.filter(previousOption => previousOption !== operationName)
            )
        } else {
            setSelectedProcessingOptions(previousOptions => [...previousOptions, operationName])
        }
    }

    const handleTextPoolSelect = event => {
        setPreview('')
        setSelectedProcessingOptions([])
        setSelectedTextPool(event.target.value)
    }

    const handlePreviewRequest = async event => {
        event.preventDefault()

        if (!selectedProcessingOptions.length) {
            createNotification(
                "You haven't selected any text processing options.", //message
                'info', // type
                5000 // duration
            )
        }

        setPreviewLoading(true)

        const url = `/api/text/processing?id=${selectedTextPool}&operations=${selectedProcessingOptions.join('&operations=')}` //prettier-ignore

        try {
            const response = await fetch(url)
            const {success, error, original, processed} = await response.json()
            if (success) {
                if (original.length && processed.length) {
                    const diff = new Diff()
                    setPreview(diff.diff(original, processed))
                }
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

            <h1 className="text-processing-heading">Prepare your text for topic modelling</h1>
            {optionsLoading ? (
                <Spinner />
            ) : (
                <div className="text-processing-container">
                    <form
                        className={`text-processing-options${optionsLoading ? ' empty' : ''}`}
                        onSubmit={handlePreviewRequest}
                    >
                        <TextPoolSelect
                            textPools={textPools}
                            selectedTextPool={selectedTextPool}
                            handleTextPoolSelect={handleTextPoolSelect}
                        />
                        <TextProcessingTable
                            operations={processingOperations}
                            classes={!selectedTextPool ? 'muted' : ''}
                            toggleProcessingOption={toggleProcessingOption}
                            selectedOptions={selectedProcessingOptions}
                        />
                        <div className="text-processing-options-footer">
                            <CustomButton classes={!selectedTextPool ? 'muted' : ''} type="submit">
                                Let's see what we've got so far!
                            </CustomButton>
                        </div>
                    </form>

                    <TextProcessingOutput
                        loading={previewLoading}
                        preview={preview}
                        classes={!selectedTextPool ? 'muted' : ''}
                    />

                    <div className="text-processing-footer">
                        <CustomButton
                            onClick={() => setShowSubmitPrompt(true)}
                            classes={!selectedTextPool ? 'muted' : ''}
                        >
                            We're done here. Let's move on!
                        </CustomButton>
                    </div>
                </div>
            )}

            <Modal
                showCross={false}
                isVisible={showSubmitPrompt}
                setIsVisible={setShowSubmitPrompt}
            >
                <h1 style={{textAlign: 'center'}}>
                    Are you certain these are the text processing options you would like applied?
                </h1>
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-evenly'}}>
                    <CustomButton onClick={() => setShowSubmitPrompt(false)}>
                        <FaArrowAltCircleLeft />
                        &nbsp; Hang on a bit!
                    </CustomButton>
                    <CustomButton onClick={() => history.push('/topic-modelling/analysis')}>
                        Yes. Let's do this! &nbsp;
                        <FaArrowAltCircleRight />
                    </CustomButton>
                </div>
            </Modal>
        </Container>
    )
}

export default TopicModellingParameters
