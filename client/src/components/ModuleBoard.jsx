import React, {useContext, useState} from 'react'

import './ModuleBoard.scss'
import {generateId} from '../utils/helpers'

import CustomButton from './common/CustomButton'
import ModuleCard from './ModuleCard'
import {Context} from '../context'

const ioTypes = {
    number: 'number',
    string: 'string'
}

const availableModules = [
    {
        name: 'nullify',
        code: 'nullify',
        color: 'firebrick',
        inputType: ioTypes.number,
        outputType: ioTypes.number
    },
    {
        name: 'square',
        code: 'square',
        color: 'cornflowerblue',
        inputType: ioTypes.number,
        outputType: ioTypes.number
    },
    {
        name: 'double',
        code: 'double',
        color: 'goldenrod',
        inputType: ioTypes.number,
        outputType: ioTypes.number
    },
    {
        name: 'halve',
        code: 'halve',
        color: 'maroon',
        inputType: ioTypes.number,
        outputType: ioTypes.number
    },
    {
        name: 'increase by one',
        code: 'increase',
        color: 'teal',
        inputType: ioTypes.number,
        outputType: ioTypes.number
    },
    {
        name: 'reduce by one',
        code: 'decrease',
        color: 'tomato',
        inputType: ioTypes.number,
        outputType: ioTypes.number
    }
]

const operationMap = {
    double: x => x * 2,
    nullify: x => 0,
    square: x => x * x,
    decrease: x => --x,
    increase: x => ++x,
    halve: x => x / 2
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
                `Expected input not compatible with provided input!`, //message
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

        setWorkflowOutput(result)
    }

    return (
        <div className="module-board-container">
            <div className="module-board">
                <h2 className="module-container-title">MODULE PALETTE / REPOSITORY</h2>

                <div className="module-list">
                    {availableModules.map((mod, index = generateId()) => (
                        <ModuleCard key={index} color={mod.color}>
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
                <div className="workflow-chain">
                    <ModuleCard key="input" classes="input right-arrow">
                        <h3 className="workflow-input-title">INPUT</h3>
                        <label htmlFor="workflow-input-value">
                            value
                            <input
                                type="text"
                                id="workflow-input-value"
                                className="workflow-input"
                                value={
                                    inputValue !== null && inputValue !== undefined
                                        ? String(inputValue)
                                        : ''
                                }
                                onChange={event => {
                                    const inputFieldString = event.target.value
                                    if (isNaN(Number(inputFieldString))) return
                                    setInputValue(Number(inputFieldString))
                                }}
                            />
                        </label>
                        <label htmlFor="workflow-input-type-label">
                            type
                            <select
                                name="workflow-input-type"
                                id="workflow-input-type"
                                className="workflow-input-type-select"
                                value={inputType}
                                onChange={event => setInputType(event.target.value)}
                            >
                                {Object.values(ioTypes).map(ioType => (
                                    <option value={ioType} key={ioType}>
                                        {ioType}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </ModuleCard>
                    <div className="module-list">
                        {selectedModules.map((mod, index = generateId()) => (
                            <ModuleCard
                                key={index}
                                color={mod.color}
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
                    <ModuleCard key="output" classes="output">
                        <p>output</p>
                        <p>
                            {!selectedModules.length
                                ? 'no operations selected!'
                                : workflowOutput ?? workflowOutput}
                        </p>
                    </ModuleCard>
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
