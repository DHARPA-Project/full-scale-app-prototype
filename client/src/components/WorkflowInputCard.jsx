import React from 'react'

import './WorkflowInputCard.scss'
import {ioTypes} from '../constants/const'

import ModuleCard from './ModuleCard'

const WorkflowInputCard = ({inputType, setInputType, inputValue, setInputValue}) => {
    return (
        <ModuleCard key="input" classes="input right-arrow">
            <h3 className="workflow-input-title">INPUT</h3>
            <label htmlFor="workflow-input-value">
                value
                <input
                    type="text"
                    id="workflow-input-value"
                    className="workflow-input"
                    value={
                        inputValue !== null && inputValue !== undefined ? String(inputValue) : ''
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
    )
}

export default WorkflowInputCard
