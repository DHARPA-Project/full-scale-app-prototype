import React, {useState} from 'react'

import {GoTrashcan} from 'react-icons/go'
import {AiOutlineSave} from 'react-icons/ai'
import {FaExclamationTriangle} from 'react-icons/fa'

import './WorkflowModuleCard.scss'

import ModuleCard from './ModuleCard'
import CustomButton from './common/CustomButton'
import MagnifyingGlassIcon from './common/icons/MagnifyingGlassIcon'
import ModuleDetailsModal from './ModuleDetailsModal'

const WorkflowModuleCard = ({mod, removeModule, setAdditionalInput}) => {
    const [detailsModalOpen, setDetailsModalOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const getModuleClasses = () => {
        let classes = 'right-arrow extensible'
        if (mod.status === 'completed') classes += ' completed'
        if (mod.status === 'failed') classes += ' failed'
        if (mod.additionalInput) classes += ' additional-input'
        return classes
    }

    const handleModuleSettingsSave = () => {
        console.log('saving module details')
        setAdditionalInput(inputValue)
        setDetailsModalOpen(false)
    }

    return (
        <ModuleCard background={mod.background} classes={getModuleClasses()}>
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
                showCross={false}
            >
                <div className="module-details-modal-content">
                    <a href="#">Link to module description / tutorial</a>

                    <ul>
                        <li>name: {mod.name}</li>
                        <li>category: {mod.category}</li>
                        <li>input: {mod.inputType}</li>
                        <li>output: {mod.outputType}</li>
                    </ul>

                    {mod.additionalInputRequired && (
                        <label>
                            input:
                            <input
                                type="text"
                                value={inputValue}
                                onChange={event => setInputValue(event.target.value)}
                            />
                        </label>
                    )}

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
