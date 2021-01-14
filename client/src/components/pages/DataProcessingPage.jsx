import React, {useContext, useEffect, useState} from 'react'

import {useHistory} from 'react-router-dom'

import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'

import {Diff} from 'diff'

import './DataProcessingPage.scss'

import Spinner from '../common/Spinner'
import CustomButton from '../common/CustomButton'
import Modal from '../common/Modal'
import TextPoolSelect from '../TextPoolSelect'
import TextProcessingTable from '../TextProcessingTable'
import TextProcessingOutput from '../TextProcessingOutput'

import {Context} from '../../context'
import PageWrapper from '../common/PageWrapper'

const DataProcessingPage = () => {
    const {loggedInUser, createNotification} = useContext(Context)
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
                const response = await fetch('/api/text/options/', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + loggedInUser.token
                    }
                })
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
        <PageWrapper>
            <div className="text-processing-page">
                <h1 className="text-processing-heading">Prepare your text for topic modelling</h1>
                <div className="text-processing-container">
                    {optionsLoading ? (
                        <Spinner />
                    ) : (
                        <>
                            <form
                                className={`text-processing-options${
                                    optionsLoading ? ' empty' : ''
                                }`}
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
                                <CustomButton
                                    classes={
                                        'text-processing-options-submit' +
                                        (!selectedTextPool ? ' muted' : '')
                                    }
                                    type="submit"
                                >
                                    Generate preview
                                </CustomButton>
                            </form>

                            <div className="text-processing-output">
                                <TextProcessingOutput
                                    loading={previewLoading}
                                    preview={preview}
                                    classes={!selectedTextPool ? 'muted' : ''}
                                />
                                <CustomButton
                                    onClick={() => setShowSubmitPrompt(true)}
                                    classes={!selectedTextPool ? 'muted' : ''}
                                >
                                    Confirm processing options
                                </CustomButton>
                            </div>
                        </>
                    )}
                </div>

                <Modal
                    showCross={false}
                    isVisible={showSubmitPrompt}
                    setIsVisible={setShowSubmitPrompt}
                >
                    <h1 style={{textAlign: 'center'}}>
                        Are you certain these are the text processing options you would like
                        applied?
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
            </div>
        </PageWrapper>
    )
}

export default DataProcessingPage
