import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import './TextProcessingOutput.scss'

import {textPreviewPlaceholder} from '../constants/const'

import CustomButton from './common/CustomButton'
import Spinner from './common/Spinner'

const TextProcessingOutput = ({loading, preview}) => {
    const history = useHistory()

    const [output, setOutput] = useState(textPreviewPlaceholder)

    const explanationTextStyle = {columnCount: 1, padding: '5rem', textAlign: 'center'}

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
        }
    }, [preview])

    return (
        <div className="text-processing-output">
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
                        className="text-processing-output-text"
                        style={
                            output === textPreviewPlaceholder
                                ? explanationTextStyle
                                : {columnCount: 2}
                        }
                    >
                        {output}
                    </div>
                    <div className="text-processing-output-footer">
                        <CustomButton
                            onClick={() => history.push('/topic-modelling/analysis')}
                            disabled={preview ? false : true}
                        >
                            We're done here. Let's move on!
                        </CustomButton>
                    </div>
                </>
            )}
        </div>
    )
}

export default TextProcessingOutput
