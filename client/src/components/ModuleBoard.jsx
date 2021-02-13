import React, {useContext, useState} from 'react'

import './ModuleBoard.scss'
import {generateId} from '../utils/helpers'
import {ioTypes, availableModules} from '../constants/const'

import CustomButton from './common/CustomButton'
import ModuleCard from './ModuleCard'
import {Context} from '../context'
import WorkflowOutputCard from './WorkflowOutputCard'
import WorkflowInputCard from './WorkflowInputCard'

const operationMap = {
    square: x => x * x,
    double: x => x * 2,
    halve: x => x / 2,
    increase: x => ++x,
    decrease: x => --x,
    uppercase: x => x.toUpperCase(),
    lowercase: x => x.toLowerCase(),
    removeDigits: x => x.replace(/\d/g, ''),
    stringifyNumber: x => String(x)
}

const ModuleBoard = () => {
    const {createNotification} = useContext(Context)

    const [selectedModules, setSelectedModules] = useState([])
    const [inputValue, setInputValue] = useState(null)
    const [inputType, setInputType] = useState(ioTypes.number)
    const [workflowOutput, setWorkflowOutput] = useState(null)

    const addOperation = mod => {
        setWorkflowOutput(null)

        const previousType = selectedModules.length
            ? selectedModules[selectedModules.length - 1].outputType
            : inputType

        if (previousType !== mod.inputType)
            return createNotification(
                `Module not compatible with provided input!`, //message
                'error', // type
                5000 // setting duration to 0 will make it never expire
            )

        setSelectedModules(prevList => [...prevList, mod])
    }

    const removeOperation = ind => {
        setWorkflowOutput(null)
        setSelectedModules(prevList => prevList.filter((_, index) => index !== ind))
    }

    const handleWorkflowExecution = () => {
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

        let result

        selectedModules.forEach((selectedModule, index) => {
            result = operationMap[selectedModule.code](index === 0 ? inputValue : result)
        })

        setWorkflowOutput(typeof result === 'string' ? `"${result}"` : result)
    }

    return (
        <div className="module-board-container">
            <div className="module-board">
                <h2 className="module-container-title">MODULE PALETTE / REPOSITORY</h2>

                <div className="module-list-wrapper module-list">
                    {availableModules.map((mod, index = generateId()) => (
                        <ModuleCard key={index} background={mod.background}>
                            <p>{mod.name}</p>
                            <button
                                className="module-card-button"
                                onClick={() => addOperation(mod)}
                            >
                                +
                            </button>
                        </ModuleCard>
                    ))}
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
                                classes="right-arrow extensible"
                            >
                                <p>{mod.name}</p>
                                <button
                                    className="module-card-button"
                                    onClick={() => removeOperation(index)}
                                >
                                    &#8722;
                                </button>
                            </ModuleCard>
                        ))}
                    </div>
                    <WorkflowOutputCard
                        workflowOutput={workflowOutput}
                        isReady={!selectedModules.length}
                    />
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

            <CustomButton style={{margin: '0 auto'}} onClick={handleWorkflowExecution}>
                Let's do this!
            </CustomButton>
        </div>
    )
}

export default ModuleBoard
