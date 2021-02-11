import React, {useContext, useState} from 'react'

import './ModuleBoard.scss'
import {generateId} from '../utils/helpers'

import CustomButton from './common/CustomButton'
import ModuleCard from './ModuleCard'
import {Context} from '../context'

const availableModules = [
    {
        name: 'double',
        code: 'double',
        color: 'goldenrod',
        inputType: 'number',
        outputType: 'number'
    },
    {
        name: 'nullify',
        code: 'nullify',
        color: 'firebrick',
        inputType: 'number',
        outputType: 'number'
    },
    {
        name: 'square',
        code: 'square',
        color: 'cornflowerblue',
        inputType: 'number',
        outputType: 'number'
    },
    {
        name: 'reduce by one',
        code: 'decrease',
        color: 'tomato',
        inputType: 'number',
        outputType: 'number'
    },
    {
        name: 'increase by one',
        code: 'increase',
        color: 'teal',
        inputType: 'number',
        outputType: 'number'
    },
    {
        name: 'halve',
        code: 'halve',
        color: 'maroon',
        inputType: 'number',
        outputType: 'number'
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
    const [inputType, setInputType] = useState('number')
    const [output, setOutput] = useState(null)
    const [operations, setOperations] = useState([])

    const addOperation = mod => {
        setOutput(null)
        setOperations(prevOperationList => [...prevOperationList, mod.code])
        setSelectedModules(prevList => [...prevList, mod])
    }

    const removeOperation = ind => {
        setOutput(null)
        setOperations(prevOperations => prevOperations.filter((_, index) => index !== ind))
        setSelectedModules(prevList => prevList.filter((_, index) => index !== ind))
    }

    const handleWorkflowExecution = () => {
        if (inputValue === null || inputValue === undefined)
            return createNotification(
                `No input data was provided!`, //message
                'error', // type
                5000 // setting duration to 0 will make it never expire
            )

        if (!operations.length)
            return createNotification(
                `No operations have been selected!`, //message
                'error', // type
                5000 // setting duration to 0 will make it never expire
            )

        let result

        operations.forEach((operationCode, index) => {
            result = operationMap[operationCode](index === 0 ? inputValue : result)
        })

        setOutput(result)
    }

    return (
        <div className="module-board-container">
            <div className="module-board">
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

                <div className="workflow-chain">
                    <ModuleCard key="input" classes="input right-arrow">
                        <h2 className="workflow-input-title">INPUT</h2>
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
                                onChange={event => setInputType(Number(event.target.value))}
                            >
                                <option value="string">string</option>
                                <option value="number">number</option>
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
                        <p>{!operations.length ? 'no operations selected!' : output ?? output}</p>
                    </ModuleCard>
                </div>
            </div>

            <div className="workflow-operations">
                {operations.reduce((output, oper, index) => output + `${++index}. ${oper}, `, '')}
            </div>

            <CustomButton style={{margin: '0 auto'}} onClick={handleWorkflowExecution}>
                Let's do this!
            </CustomButton>
        </div>
    )
}

export default ModuleBoard
