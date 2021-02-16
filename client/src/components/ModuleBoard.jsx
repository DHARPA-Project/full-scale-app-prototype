import React, {useContext, useEffect, useState} from 'react'

import {GrLaunch} from 'react-icons/gr'
import {AiOutlineSave} from 'react-icons/ai'
import {GoTrashcan} from 'react-icons/go'

import './ModuleBoard.scss'
import {Context} from '../context'
import {generateId} from '../utils/helpers'
import {ioTypes, availableModules, moduleCategories} from '../constants/const'

import ModuleCard from './ModuleCard'
import WorkflowOutputCard from './WorkflowOutputCard'
import WorkflowInputCard from './WorkflowInputCard'
import LoadingIndicator from './common/LoadingIndicator'
import {FcCancel} from 'react-icons/fc'
import SwitchCheckbox from './common/SwitchCheckbox'

const operationMap = {
    square: x => x * x,
    double: x => x * 2,
    halve: x => x / 2,
    increase: x => ++x,
    decrease: x => --x,
    uppercase: x => x.toUpperCase(),
    lowercase: x => x.toLowerCase(),
    removeDigits: x => x.replace(/\d/g, ''),
    removeLetters: x => x.replace(/[A-Za-z]/g, ''),
    stringifyNumber: x => String(x),
    stringToInteger: x => {
        const int = parseInt(x)
        if (isNaN(int)) throw new Error('The input cannot be converted to a number!')
        return int
    }
}

const availableModuleCategories = Object.values(moduleCategories)

const ModuleBoard = () => {
    const {createNotification} = useContext(Context)

    const [enabledModuleCategories, setEnabledModuleCategories] = useState(availableModuleCategories) //prettier-ignore
    const [visibleModules, setVisibleModules] = useState(availableModules)
    const [selectedModules, setSelectedModules] = useState([])
    const [inputValue, setInputValue] = useState(null)
    const [inputType, setInputType] = useState(ioTypes.number)
    const [workflowOutput, setWorkflowOutput] = useState(null)
    const [workflowExecutionInProgress, setWorkflowExecutionInProgress] = useState(false)
    const [workflowExecutionFailed, setWorkflowExecutionFailed] = useState(false)

    useEffect(() => {
        setVisibleModules(
            availableModules.filter(module => enabledModuleCategories.includes(module.category))
        )
    }, [enabledModuleCategories])

    const handleModuleCategorySwitch = event => {
        const moduleCategory = event.target.value
        enabledModuleCategories.includes(moduleCategory)
            ? setEnabledModuleCategories(prevCategories =>
                  prevCategories.filter(category => category !== moduleCategory)
              )
            : setEnabledModuleCategories(prevCategories => [...prevCategories, moduleCategory])
    }

    const addModule = newModule => {
        setWorkflowOutput(null)
        setWorkflowExecutionFailed(false)

        const previousType = selectedModules.length
            ? selectedModules[selectedModules.length - 1].outputType
            : inputType

        if (previousType !== newModule.inputType)
            return createNotification(
                `Module not compatible with provided input!`, //message
                'error', // type
                5000 // setting duration to 0 will make it never expire
            )

        // clear the status of already selected modules and add new module
        setSelectedModules(prevList => [
            ...prevList.map(module => ({...module, status: null})),
            newModule
        ])
    }

    const removeModule = ind => {
        setWorkflowOutput(null)
        setWorkflowExecutionFailed(false)

        setSelectedModules(prevList =>
            prevList.filter((_, index) => index !== ind).map(module => ({...module, status: null}))
        )
    }

    const handleWorkflowReset = () => {
        setWorkflowOutput(null)
        setWorkflowExecutionFailed(false)
        setInputValue(null)
        setSelectedModules([])
    }

    const handleWorkflowSave = () => {
        if (!selectedModules.length) {
            return createNotification(
                `No workflow elements have been selected!`, //message
                'warning', // type
                5000 // setting duration to 0 will make it never expire
            )
        }

        createNotification(
            `Workflow saved.`, //message
            'success', // type
            5000 // setting duration to 0 will make it never expire
        )
    }

    const handleWorkflowExecution = async () => {
        if (inputValue === null || inputValue === undefined)
            return createNotification(
                `No input data was provided!`, //message
                'error', // type
                5000 // setting duration to 0 will make it never expire
            )

        if (!selectedModules.length)
            return createNotification(
                `No operations have been selected!`, //message
                'error', // type
                5000 // setting duration to 0 will make it never expire
            )

        // clear the status of already selected modules
        setSelectedModules(prevList => [...prevList.map(module => ({...module, status: null}))])
        setWorkflowExecutionFailed(false)
        setWorkflowOutput(null)
        setWorkflowExecutionInProgress(true)
        createNotification(
            `Workflow execution started.`, //message
            'success', // type
            5000 // setting duration to 0 will make it never expire
        )

        let result

        for (let i = 0, len = selectedModules.length; i < len; i++) {
            try {
                // simulate longer execution duration for each operation
                await new Promise(resolve => setTimeout(resolve, 1000))
                console.log('executing module: ', selectedModules[i])
                result = operationMap[selectedModules[i].code](i === 0 ? inputValue : result)

                console.log(`making module ${i} completed`)
                setSelectedModules(prevModules =>
                    prevModules.map((module, index) =>
                        index === i ? {...module, status: 'completed'} : module
                    )
                )
            } catch (error) {
                console.error(error)
                setSelectedModules(prevModules =>
                    prevModules.map((module, index) =>
                        index === i ? {...module, status: 'failed'} : module
                    )
                )
                setWorkflowOutput('FAILED!')
                setWorkflowExecutionFailed(true)
                setWorkflowExecutionInProgress(false)
                return
            }
        }

        // simulate minor delay before displaying output
        await new Promise(resolve => setTimeout(resolve, 1000))
        setWorkflowOutput(typeof result === 'string' ? `"${result}"` : result)
        setWorkflowExecutionInProgress(false)
    }

    return (
        <div className="module-board-container">
            <div className="module-board">
                <h2 className="module-container-title">MODULE PALETTE / REPOSITORY</h2>

                <div className="module-pool-filter">
                    {availableModuleCategories.map(moduleCategory => (
                        <SwitchCheckbox
                            key={moduleCategory}
                            value={moduleCategory}
                            label={moduleCategory}
                            enabled={enabledModuleCategories.includes(moduleCategory)}
                            onToggle={handleModuleCategorySwitch}
                        />
                    ))}
                </div>

                <div className="module-list-wrapper">
                    <div className="module-list">
                        {visibleModules.map((mod, index = generateId()) => (
                            <ModuleCard key={index} background={mod.background}>
                                <p>{mod.name}</p>
                                <button
                                    className="module-card-button"
                                    onClick={() => addModule(mod)}
                                >
                                    +
                                </button>
                            </ModuleCard>
                        ))}
                    </div>
                </div>

                <h2 className="module-container-title">WORKFLOW ASSEMBLER</h2>
                <div className="module-list-wrapper workflow-chain">
                    <WorkflowInputCard
                        inputType={inputType}
                        setInputType={setInputType}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        inputTypeExpectedByNextModule={
                            selectedModules.length ? selectedModules[0].inputType : null
                        }
                    />
                    <div className="module-list">
                        {selectedModules.map((mod, index = generateId()) => (
                            <ModuleCard
                                key={index}
                                background={mod.background}
                                classes={`right-arrow extensible${
                                    mod.status === 'completed'
                                        ? ' completed'
                                        : mod.status === 'failed'
                                        ? ' failed'
                                        : ''
                                }`}
                            >
                                <p>{mod.name}</p>
                                <button
                                    className="module-card-button"
                                    onClick={() => removeModule(index)}
                                >
                                    &#8722;
                                </button>
                            </ModuleCard>
                        ))}
                    </div>
                    <WorkflowOutputCard
                        workflowOutput={workflowOutput}
                        isReady={!!workflowOutput}
                        isError={workflowExecutionFailed}
                    />
                    <div className="workflow-controls">
                        <div className="workflow-button-reset" onClick={handleWorkflowReset}>
                            {workflowExecutionInProgress ? <FcCancel /> : <GoTrashcan />}
                        </div>

                        <div className="workflow-button-execute" onClick={handleWorkflowExecution}>
                            {workflowExecutionInProgress ? (
                                <LoadingIndicator size={'40px'} />
                            ) : (
                                <GrLaunch />
                            )}
                        </div>

                        <div className="workflow-button-save" onClick={handleWorkflowSave}>
                            <AiOutlineSave />
                        </div>
                    </div>
                </div>
            </div>

            <div className="workflow-operations">
                {selectedModules.reduce(
                    (summary, selectedModule, index) =>
                        summary +
                        ` --> ${index + 1}. ${selectedModule.code} ${
                            index === selectedModules.length - 1 && workflowOutput
                                ? ' = ' + workflowOutput
                                : ''
                        }`,
                    `${inputValue ? inputValue : ''}`
                )}
            </div>
        </div>
    )
}

export default ModuleBoard
