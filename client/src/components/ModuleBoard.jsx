import React, {useEffect, useState} from 'react'
import CustomButton from './common/CustomButton'

import './ModuleBoard.scss'

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

    const handleProcess = () => {
        if (!operations.length) return

        let result

        operations.forEach((operationCode, index) => {
            result = operationMap[operationCode](index === 0 ? input : result)
        })

        setOutput(result)
    }

    return (
        <div className="module-board-container">
            <CustomButton style={{margin: '0 auto'}} onClick={handleProcess}>
                Let's do this!
            </CustomButton>

            <div className="module-board">
                <div className="module-list">
                    {availableModules.map((mod, ind) => (
                        <div
                            className="module-item"
                            key={ind}
                            onClick={() => addOperation(mod)}
                            style={{backgroundColor: `${mod.color}`}}
                        >
                            {mod.name}
                        </div>
                    ))}
                </div>

                <div className="module-list">
                    <div className="module-list-block">
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
                        {selectedModules.map((mod, ind) => (
                            <div
                                className="module-item"
                                key={ind}
                                onClick={() => removeOperation(ind)}
                                style={{backgroundColor: `${mod.color}`}}
                            >
                                {mod.name}
                            </div>
                        ))}
                    </div>
                    <div className="module-list-block">
                        <div className="workflow-operations">
                            {operations.reduce(
                                (output, oper, index) => output + `${++index}. ${oper}, `,
                                ''
                            )}
                        </div>
                        <div className="workflow-output">
                            {!operations.length ? 'no operations selected!' : output ?? output}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModuleBoard
