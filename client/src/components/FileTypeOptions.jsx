import React, {useContext} from 'react'

import RadioButtons from './common/RadioButtons'
import {fileTypeNames} from '../constants/const'
import {Context} from '../context'

const FileTypeOptions = () => {
    const {selectedFileType, setSelectedFileType} = useContext(Context)

    return (
        <RadioButtons
            options={fileTypeNames}
            selected={selectedFileType}
            setSelected={setSelectedFileType}
        />
    )
}

export default FileTypeOptions
