import React, {useContext} from 'react'

import './WorkflowInputCard.scss'
import {Context} from '../context'
import {ioTypes} from '../constants/const'

import ModuleCard from './ModuleCard'

const WorkflowInputCard = ({
    inputType,
    setInputType,
    inputValue,
    setInputValue,
    inputTypeExpectedByNextModule
}) => {
    const {createNotification} = useContext(Context)

    const handleInputTypeChange = event => {
        const newInputType = event.target.value
        if (inputTypeExpectedByNextModule && inputTypeExpectedByNextModule !== newInputType) {
            return createNotification(
                `Selected input type not compatible with following module!`, //message
                'error', // type
                5000 // setting duration to 0 will make it never expire
            )
        }
        setInputType(event.target.value)
    }

    const handleInputValueChange = event => {
        const inputFieldString = event.target.value
        if (isNaN(Number(inputFieldString))) return
        setInputValue(Number(inputFieldString))
    }

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
                    onChange={handleInputValueChange}
                />
            </label>
            <label htmlFor="workflow-input-type-label">
                type
                <select
                    name="workflow-input-type"
                    id="workflow-input-type"
                    className="workflow-input-type-select"
                    value={inputType}
                    onChange={handleInputTypeChange}
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
