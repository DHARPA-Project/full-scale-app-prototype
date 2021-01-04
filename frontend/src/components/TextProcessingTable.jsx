import React from 'react'

import './TextProcessingTable.scss'

import SwitchCheckbox from './common/SwitchCheckbox'

const TextProcessingTable = ({
    operations,
    textPoolSelected,
    selectedOptions,
    toggleProcessingOption
}) => {
    if (!operations.length) return null

    return (
        <table className="text-processing-table">
            <thead>
                <tr>
                    <th colSpan="2">Text Processing Options</th>
                </tr>
            </thead>
            <tbody>
                {operations.map(operation => (
                    <tr key={operation.name}>
                        <th>
                            <SwitchCheckbox
                                enabled={
                                    operation.enabled || selectedOptions.includes(operation.name)
                                }
                                disabled={!textPoolSelected}
                                onToggle={() => toggleProcessingOption(operation.name)}
                            />
                        </th>
                        <td>{operation.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TextProcessingTable
