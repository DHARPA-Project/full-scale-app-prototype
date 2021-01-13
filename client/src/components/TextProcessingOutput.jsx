import React, {useState, useEffect} from 'react'
import {motion} from 'framer-motion'

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
                        className={
                            fragment.added ? 'added' : fragment.removed ? 'removed' : 'regular'
                        }
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
        <div className={`text-processing-preview ${classes}`}>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <div className="text-processing-preview-explanation">
                        <span className="regular">unchanged text</span>
                        <span className="removed">deleted fragments</span>
                        <span className="added">added fragments</span>
                    </div>
                    <motion.div
                        className={`text-processing-preview-text ${
                            output === textPreviewPlaceholder ? 'placeholder' : ''
                        }`}
                        initial={{opacity: 0}}
                        animate={{opacity: 1, transition: {duration: 0.5}}}
                    >
                        {output}
                    </motion.div>
                </>
            )}
        </div>
    )
}

export default TextProcessingOutput
