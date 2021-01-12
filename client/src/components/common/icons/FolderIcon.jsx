import React from 'react'

import {IconContext} from 'react-icons'
import {AiFillFolderOpen} from 'react-icons/ai'

const FolderIcon = () => {
    return (
        <IconContext.Provider value={{color: 'rgba(0, 0, 0, 0.87)'}}>
            <AiFillFolderOpen className="icon" />
        </IconContext.Provider>
    )
}

export default FolderIcon
