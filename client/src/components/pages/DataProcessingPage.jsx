import React, {useContext, useEffect, useRef, useState} from 'react'
import axios from 'axios'

import {useHistory} from 'react-router-dom'

import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'

import {Diff} from 'diff'

import './DataProcessingPage.scss'

import PageWrapper from '../common/PageWrapper'
import Modal from '../common/Modal'
import CustomButton from '../common/CustomButton'
import LoadingIndicator from '../common/LoadingIndicator'
import TextPoolSelect from '../TextPoolSelect'
import TextProcessingTable from '../TextProcessingTable'
import TextProcessingOutput from '../TextProcessingOutput'

import {Context} from '../../context'
import PageHeader from '../common/PageHeader'

const DataProcessingPage = () => {
    const {loggedInUser, createNotification} = useContext(Context)
    const history = useHistory()

    const timeoutRef = useRef(null)

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
                const response = await axios.get('/api/text/options/', {
                    headers: {Authorization: 'Bearer ' + loggedInUser.token}
                })

                const {success, error, pools, operations} = response.data
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
        // eslint-disable-next-line
    }, [loggedInUser.token])

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

        const url = `/api/data/text/preview/${selectedTextPool}?operations=${selectedProcessingOptions.join('&operations=')}` //prettier-ignore

        try {
            const response = await axios.get(url, {
                headers: {Authorization: 'Bearer ' + loggedInUser.token}
            })

            const {success, error, original, processed} = response.data
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

    const handleProcessingOptionsSubmit = async () => {
        const url = `/api/data/text/${selectedTextPool}`

        try {
            const response = await axios.post(
                url,
                {
                    operations: selectedProcessingOptions
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + loggedInUser.token
                    }
                }
            )

            if (response?.data?.success) {
                createNotification(
                    response?.data?.message
                        ? response.data.message
                        : `Text processing options successfully submitted`, //message
                    'success', // type
                    5000 // setting duration to 0 will make it never expire
                )

                setPreview('')
                setSelectedProcessingOptions([])

                timeoutRef.current = setTimeout(() => history.push('/file-management'), 6000)
            } else {
                throw new Error(response?.data?.error ? response.data.error : '')
            }
        } catch (error) {
            console.error('Failed to submit text processing options to the server', error)
            createNotification(
                `Submitting text processing options to the failed.${error}`, //message
                'error', // type
                0 // setting duration to 0 will make it never expire
            )
        }
    }

    return (
        <PageWrapper>
            <div className="data-processing-page">
                <PageHeader>
                    <h1 className="data-processing-title">Process your data</h1>
                </PageHeader>

                <div className="data-processing-container">
                    {optionsLoading ? (
                        <LoadingIndicator />
                    ) : (
                        <>
                            <form
                                className={`data-processing-options${
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
                                        'data-processing-options-submit' +
                                        (!selectedTextPool ? ' muted' : '')
                                    }
                                    type="submit"
                                >
                                    Generate preview
                                </CustomButton>
                            </form>

                            <div className="data-processing-output">
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
                        <CustomButton classes="inverted" onClick={() => setShowSubmitPrompt(false)}>
                            <FaArrowAltCircleLeft />
                            &nbsp; Hang on a bit!
                        </CustomButton>
                        <CustomButton classes="inverted" onClick={handleProcessingOptionsSubmit}>
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
