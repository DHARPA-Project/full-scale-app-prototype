import React, {useContext, useEffect, useState} from 'react'

import {GrLaunch} from 'react-icons/gr'
import {AiOutlineSave} from 'react-icons/ai'
import {GoTrashcan} from 'react-icons/go'

import './ModuleBoard.scss'
import {Context} from '../context'
import {generateId} from '../utils/helpers'
import {ioTypes, availableModules, moduleCategories, operationMap} from '../constants/const'

import SwitchCheckbox from './common/SwitchCheckbox'
import SearchBar from './common/SearchBar'
import ModuleCard from './ModuleCard'
import WorkflowOutputCard from './WorkflowOutputCard'
import WorkflowInputCard from './WorkflowInputCard'
import WorkflowModuleCard from './WorkflowModuleCard'
import LoadingIndicator from './common/LoadingIndicator'
import {FcCancel} from 'react-icons/fc'

const availableModuleCategories = Object.values(moduleCategories)

const ModuleBoard = () => {
    const {createNotification} = useContext(Context)

    const [enabledModuleCategories, setEnabledModuleCategories] = useState(availableModuleCategories) //prettier-ignore
    const [visibleModules, setVisibleModules] = useState(availableModules)
    const [selectedModules, setSelectedModules] = useState([])
    const [inputValue, setInputValue] = useState(null)
    const [inputType, setInputType] = useState(ioTypes.number)
    const [workflowOutput, setWorkflowOutput] = useState(null)
    const [allInputProvided, setAllInputProvided] = useState(false)
    const [workflowExecutionInProgress, setWorkflowExecutionInProgress] = useState(false)
    const [workflowExecutionFailed, setWorkflowExecutionFailed] = useState(false)

    useEffect(() => {
        setVisibleModules(
            availableModules.filter(module => enabledModuleCategories.includes(module.category))
        )
    }, [enabledModuleCategories])

    useEffect(() => {
        setAllInputProvided(
            selectedModules.every(
                selectedModule =>
                    !selectedModule.additionalInputRequired || selectedModule.additionalInput
            )
        )
    }, [selectedModules])

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
            {...newModule, assemblyID: generateId()}
        ])
    }

    const removeModule = idToDelete => {
        setWorkflowOutput(null)
        setWorkflowExecutionFailed(false)

        setSelectedModules(prevList =>
            prevList
                .filter(selectedModule => selectedModule.assemblyID !== idToDelete)
                .map(module => ({...module, status: null}))
        )
    }

    const updateModuleData = updatedModule => {
        setWorkflowOutput(null)
        setWorkflowExecutionFailed(false)

        setSelectedModules(modules =>
            modules.map(selectedModule =>
                selectedModule.assemblyID === updatedModule.assemblyID
                    ? updatedModule
                    : selectedModule
            )
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

        if (!allInputProvided)
            return createNotification(
                `Please provide all input for all selected modules!`, //message
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
                const functionToExecute = operationMap[selectedModules[i].code]
                const firstArgument = i === 0 ? inputValue : result
                if (selectedModules[i].additionalInputRequired) {
                    result = functionToExecute(firstArgument, selectedModules[i].additionalInput)
                } else {
                    result = functionToExecute(firstArgument)
                }

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
                <h2 className="module-container-title">MODULE POOL</h2>

                <div className="module-pool-controls">
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

                    <div className="module-pool-search">
                        <SearchBar
                            searchDelay={1}
                            placeholder={'search modules...'}
                            userQuery={''}
                            handleUserQuery={() => {}}
                        />
                    </div>
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

                <h2 className="module-container-title">WORKFLOW ASSEMBLY</h2>

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
                        {selectedModules.map(mod => (
                            <WorkflowModuleCard
                                key={mod.assemblyID}
                                mod={mod}
                                removeModule={removeModule}
                                updateModuleData={updateModuleData}
                            />
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
        </div>
    )
}

export default ModuleBoard
