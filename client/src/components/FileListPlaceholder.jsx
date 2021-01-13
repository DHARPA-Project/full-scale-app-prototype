import React from 'react'

import {AiOutlineFileUnknown} from 'react-icons/ai'

import './FileListPlaceholder.scss'

const FileListPlaceholder = () => {
    return (
        <div className="file-list-placeholder">
            <div className="middle">
                <AiOutlineFileUnknown />
                <h2>No documents have been uploaded.</h2>
            </div>
        </div>
    )
}

export default FileListPlaceholder
