import React, {useEffect, useState} from 'react'

import {GoTrashcan} from 'react-icons/go'
import {AiOutlineSave} from 'react-icons/ai'
import {FaExclamationTriangle} from 'react-icons/fa'

import './WorkflowModuleCard.scss'

import ModuleCard from './ModuleCard'
import CustomButton from './common/CustomButton'
import MagnifyingGlassIcon from './common/icons/MagnifyingGlassIcon'
import ModuleDetailsModal from './ModuleDetailsModal'
import SwitchCheckbox from './common/SwitchCheckbox'

const WorkflowModuleCard = ({mod, removeModule, updateModuleData}) => {
    const [classList, setClassList] = useState('')
    const [detailsModalOpen, setDetailsModalOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [notes, setNotes] = useState('')
    const [tags, setTags] = useState('')
    const [selectedOutputOptions, setSelectedOutputOptions] = useState([])

    useEffect(() => {
        setClassList(getModuleClasses())
        //eslint-disable-next-line
    }, [mod.expectedOutput, mod.status])

    const getModuleClasses = () => {
        let classes = 'right-arrow extensible workflow-module-card'
        if (mod.status === 'completed') classes += ' completed'
        if (mod.status === 'failed') classes += ' failed'
        if (mod.additionalInput) classes += ' additional-input'
        if (mod?.expectedOutput?.length) classes += ' output-required'
        return classes
    }

    const handleModuleSettingsSave = () => {
        console.log('saving module details')
        updateModuleData({
            ...mod,
            status: '',
            additionalInput: inputValue,
            expectedOutput: selectedOutputOptions,
            notes,
            tags
        })
        // setAdditionalInput(inputValue)
        setDetailsModalOpen(false)
    }

    const handleSelectOutputOptions = event => {
        const outputOption = event.target.value
        console.log('toggle selected output option: ', outputOption)
        if (selectedOutputOptions.includes(outputOption)) {
            setSelectedOutputOptions(prevOptions =>
                prevOptions.filter(option => option !== outputOption)
            )
        } else {
            setSelectedOutputOptions(prevOptions => [...prevOptions, outputOption])
        }
    }

    return (
        <ModuleCard background={mod.background} classes={classList}>
            <div className="workflow-module-card-content">
                <div className="workflow-module-card-top">
                    {mod.additionalInputRequired && !mod.additionalInput && (
                        <FaExclamationTriangle />
                    )}
                </div>
                <div className="workflow-module-card-center">
                    <p>{mod.name}</p>
                    <div
                        className="workflow-module-card-details"
                        onClick={() => {
                            console.log('card details clicked')
                            setDetailsModalOpen(true)
                        }}
                    >
                        <MagnifyingGlassIcon />
                    </div>
                </div>
                <div className="workflow-module-card-bottom">
                    <div
                        className="workflow-module-card-remove"
                        onClick={() => removeModule(mod.assemblyID)}
                    >
                        <GoTrashcan />
                    </div>
                </div>
            </div>

            <ModuleDetailsModal
                isVisible={detailsModalOpen}
                setIsVisible={setDetailsModalOpen}
                showCross={true}
            >
                <div className="module-details-modal-content">
                    <h2>
                        <a href="#">Link to module description / tutorial</a>
                    </h2>

                    <ul>
                        <li>name: {mod.name}</li>
                        <li>category: {mod.category}</li>
                        <li>input: {mod.inputType}</li>
                        <li>output: {mod.outputType}</li>
                    </ul>

                    {mod.additionalInputRequired && (
                        <label className="user-input">
                            input:
                            <input
                                type="text"
                                value={inputValue}
                                onChange={event => setInputValue(event.target.value)}
                            />
                        </label>
                    )}
                    <br />

                    <label className="user-input">
                        notes:
                        <input
                            type="text"
                            value={notes}
                            onChange={event => setNotes(event.target.value)}
                        />
                    </label>
                    <br />

                    <label className="user-input">
                        tags:
                        <input
                            type="text"
                            value={tags}
                            onChange={event => setTags(event.target.value)}
                        />
                    </label>

                    <div className="module-details-modal-output">
                        {['save data', 'download file'].map(outputOption => (
                            <SwitchCheckbox
                                key={outputOption}
                                value={outputOption}
                                label={outputOption}
                                enabled={selectedOutputOptions.includes(outputOption)}
                                onToggle={handleSelectOutputOptions}
                            />
                        ))}
                    </div>

                    <CustomButton onClick={handleModuleSettingsSave}>
                        <AiOutlineSave />
                        &nbsp;&nbsp;Save
                    </CustomButton>
                </div>
            </ModuleDetailsModal>
        </ModuleCard>
    )
}

export default WorkflowModuleCard
