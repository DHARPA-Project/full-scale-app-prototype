import React, {useState} from 'react'

import {GoTrashcan} from 'react-icons/go'
import {FaExclamationTriangle} from 'react-icons/fa'

import './WorkflowModuleCard.scss'

import ModuleCard from './ModuleCard'
import MagnifyingGlassIcon from './common/icons/MagnifyingGlassIcon'
import ModuleDetailsModal from './ModuleDetailsModal'

const WorkflowModuleCard = ({index, mod, removeModule, setAdditionalInput}) => {
    const [detailsModalOpen, setDetailsModalOpen] = useState(false)

    return (
        <ModuleCard
            background={mod.background}
            classes={`right-arrow extensible${
                mod.status === 'completed' ? ' completed' : mod.status === 'failed' ? ' failed' : ''
            }`}
        >
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
                        onClick={() => removeModule(index)}
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
                                value={mod.additionalInput}
                                onChange={event => setAdditionalInput(event.target.value)}
                            />
                        </label>
                    )}
                </div>
            </ModuleDetailsModal>
        </ModuleCard>
    )
}

export default WorkflowModuleCard
