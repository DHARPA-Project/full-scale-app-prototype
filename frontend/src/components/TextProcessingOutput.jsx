import React, {useState, useEffect} from 'react'

import './TextProcessingOutput.scss'

import {textPreviewPlaceholder} from '../constants/const'

import Spinner from './common/Spinner'

const TextProcessingOutput = ({loading, preview, classes}) => {
    const [output, setOutput] = useState(textPreviewPlaceholder)

    useEffect(() => {
        if (preview?.length) {
            setOutput(
                preview.map((fragment, index) => (
                    <span
                        key={index}
                        className={fragment.added ? 'added' : fragment.removed ? 'removed' : ''}
                    >
                        {fragment.value}
                    </span>
                ))
            )
        } else {
            setOutput(textPreviewPlaceholder)
        }
    }, [preview])

    return (
        <div className={`text-processing-output ${classes}`}>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <div className="text-processing-output-explanation">
                        <span className="output-unchanged">unchanged text</span>
                        <span className="output-deleted">deleted fragments</span>
                        <span className="output-added">added fragments</span>
                    </div>
                    <div
                        className={`text-processing-output-text ${
                            output === textPreviewPlaceholder ? 'placeholder' : ''
                        }`}
                    >
                        {output}
                    </div>
                </>
            )}
        </div>
    )
}

export default TextProcessingOutput
