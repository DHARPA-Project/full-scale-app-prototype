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
        color: 'goldenrod'
    },
    {
        name: 'nullify',
        code: 'nullify',
        color: 'firebrick'
    },
    {
        name: 'square',
        code: 'square',
        color: 'cornflowerblue'
    },
    {
        name: 'reduce by one',
        code: 'decrease',
        color: 'tomato'
    },
    {
        name: 'increase by one',
        code: 'increase',
        color: 'teal'
    }
]

const operationMap = {
    double: x => x * 2,
    nullify: x => 0,
    square: x => x * x,
    decrease: x => --x,
    increase: x => ++x
}

const ModuleBoard = () => {
    const {createNotification} = useContext(Context)

    const [selectedModules, setSelectedModules] = useState([])
    const [input, setInput] = useState(0)
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
        if (!operations.length)
            return createNotification(
                `No operations have been chosen!`, //message
                'error', // type
                5000 // setting duration to 0 will make it never expire
            )

        let result

        operations.forEach((operationCode, index) => {
            result = operationMap[operationCode](index === 0 ? input : result)
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
                        <p>input</p>
                        <input
                            type="text"
                            className="workflow-input"
                            value={String(input)}
                            onChange={event => {
                                const inputFieldString = event.target.value
                                if (isNaN(Number(inputFieldString))) return
                                setInput(Number(inputFieldString))
                            }}
                        />
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
