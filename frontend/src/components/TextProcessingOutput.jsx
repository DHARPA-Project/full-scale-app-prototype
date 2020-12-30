import React from 'react'
import {useHistory} from 'react-router-dom'

import './TextProcessingOutput.scss'

import {textPreviewPlaceholder} from '../constants/const'
import CustomButton from './common/CustomButton'

const TextProcessingOutput = () => {
    const history = useHistory()

    const explanationTextStyle = {columnCount: 1, padding: '5rem', textAlign: 'center'}

    return (
        <div className="text-processing-output">
            <div className="text-processing-output-explanation">
                <span className="output-unchanged">unchanged text</span>
                <span className="output-deleted">deleted fragments</span>
                <span className="output-added">added fragments</span>
            </div>
            <div
                className="text-processing-output-text"
                style={textPreviewPlaceholder.length < 1000 ? explanationTextStyle : {}}
            >
                {textPreviewPlaceholder}
            </div>
            <div className="text-processing-output-footer">
                <CustomButton onClick={() => history.push('/topic-modelling/analysis')}>
                    We're done here. Let's move on!
                </CustomButton>
            </div>
        </div>
    )
}

export default TextProcessingOutput
